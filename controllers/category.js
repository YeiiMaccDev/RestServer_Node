const { request, response } = require("express");

const { Category } = require('../models');

const createCategory = async (req = request, res = response) => {
    const name = req.body.name.toUpperCase();

    const existsCategory = await Category.findOne({ name });

    if (existsCategory) {
        return res.status(400).json({
            message: `La categoría ${existsCategory.name} ya existe.`
        });
    }

    // Generate data
    const data = {
        name,
        user: req.authenticatedUser._id
    }

    const category = new Category(data);
    await category.save();

    res.status(201).json(category);
}


module.exports = {
    createCategory
}