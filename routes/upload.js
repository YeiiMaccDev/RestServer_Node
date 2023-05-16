const { Router } = require("express");
const { check } = require("express-validator");

const { uploadFiles, updateImage } = require("../controllers/uploads");
const { collectionsAuthorized } = require("../helpers");
const { validateFields, validateUploadFiles } = require("../middlewares");

const router = Router();

router.post('/', [
    validateUploadFiles,
    validateFields
], uploadFiles)

router.put('/:collection/:id', [
    validateUploadFiles,
    check('id', 'No es un ID válido.').isMongoId(),
    validateFields,
    check('collection').custom( c => collectionsAuthorized(c, ['users', 'products'])),
    validateFields
], updateImage);

module.exports = router;