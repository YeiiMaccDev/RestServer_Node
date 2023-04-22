const { Router } = require('express');
const { getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers } = require('../controllers/user');
const { check } = require('express-validator');

const router = Router();

router.get('/', getUsers);

router.post('/', [
    check('email', 'El email no es válido.').isEmail(),
], postUsers);

router.put('/:id', putUsers);

router.patch('/', patchUsers);

router.delete('/', deleteUsers);

module.exports = router;