const { Router } = require("express");
const { check } = require("express-validator");

const { uploadFiles, updateImage } = require("../controllers/uploads");
const { collectionsAuthorized } = require("../helpers");
const { validateFields } = require("../middlewares");

const router = Router();

router.post('/', uploadFiles)

router.put('/:collection/:id', [
    check('id', 'No es un ID válido.').isMongoId(),
    validateFields,
    check('collection').custom( c => collectionsAuthorized(c, ['users', 'products'])),
    validateFields
], updateImage);

module.exports = router;