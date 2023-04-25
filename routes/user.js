const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
} = require('../controllers/user');

const { validateFields,
    validateJWT,
    isAdminRole,
    isRole
} = require('../middlewares');

const { isValidRole,
    existsEmail,
    existsUserById
} = require('../helpers/db-validators');


const router = Router();

router.get('/', getUsers);

router.post('/', [
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    check('password', 'La contraseña debe tener más de 6 letras.').isLength({ min: 6 }),
    check('email', 'El email es obligatorio.').not().isEmpty(),
    check('email', 'El email no es válido.').isEmail(),
    check('email').custom(existsEmail),
    // check('role', 'No es un rol válido.').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isValidRole),
    validateFields
], postUsers);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validateFields,
    check('id').custom(existsUserById),
    check('role').custom(isValidRole),
    validateFields
], putUsers);

router.patch('/:id', patchUsers);

router.delete('/:id', [
    validateJWT,
    // isAdminRole,
    isRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    validateFields,
    check('id').custom(existsUserById),
    validateFields
], deleteUsers);

module.exports = router;