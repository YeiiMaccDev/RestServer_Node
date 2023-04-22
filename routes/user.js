const { Router } = require('express');
const { getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers } = require('../controllers/user');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const Role = require('../models/role');

const router = Router();

router.get('/', getUsers);

router.post('/', [
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    check('password', 'La contraseña debe tener más de 6 letras.').isLength({ min:6 }),
    check('email', 'El email es obligatorio.').not().isEmpty(),
    check('email', 'El email no es válido.').isEmail(),
    // check('role', 'No es un rol válido.').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( async(role = '') => {
        const existsRole = await Role.findOne({ role});
        if ( ! existsRole ) {
            throw new Error(`El rol ${ role} no está registrado en la DB`);
        }
    }),
    validateFields
], postUsers);

router.put('/:id', putUsers);

router.patch('/', patchUsers);

router.delete('/', deleteUsers);

module.exports = router;