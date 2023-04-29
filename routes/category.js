const { Router } = require("express");
const { check } = require("express-validator");

const { validateJWT, validateFields } = require("../middlewares");
const { createCategory } = require("../controllers/category");



const router = Router();

/**
 * {{url}}/api/categories
 */

// Public - Obtener todas las categorias
router.get('/', (req, res) => {
    res.json('Get Categorias')
} );

// Public - Obtener una categoria por id 
router.get('/:id', (req, res) => { 
    res.json('Get por Id')
});

// Private - Valid token-  Create category
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    validateFields
], createCategory);

// Private - Valid token - Update category
router.put('/:id', (req, res) => {
    res.json('Update category')
});

// Private - ADMIN_ROLE - Delete category
router.delete('/:id', (req, res) => { 
    res.json('Delete category')
});



module.exports = router;