const { Router } = require("express");


const router = Router();

// Public - Obtener todas las categorias
router.get('/', (req, res) => {
    res.json('Get Categorias')
} );

// Public - Obtener una categoria por id 
router.get('/:id', (req, res) => { 
    res.json('Get por Id')
});

// Private - Valid token-  Create category
router.post('/', (req, res) => { 
    res.json('Create category')
});

// Private - Valid token - Update category
router.put('/:id', (req, res) => {
    res.json('Update category')
});

// Private - ADMIN_ROLE - Delete category
router.delete('/:id', (req, res) => { 
    res.json('Delete category')
});



module.exports = router;