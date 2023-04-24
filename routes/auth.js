const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { existsEmail } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();


router.post('/login',[
    check('email', 'El email es obligatorio.').not().isEmpty(),
    check('email', 'El email no es válido.').isEmail(),
    check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    validateFields
],  login);

module.exports = router;