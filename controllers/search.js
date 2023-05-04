const { request, response } = require("express");
const { isValidObjectId } = require("mongoose");

const {
    Category,
    Product,
    Role,
    User
} = require("../models");


const collectionsLicensed = [
    'categories',
    'products',
    'roles',
    'users',
];


const searchCategories = async (query = '', res = response) => {
    const isMongoId = isValidObjectId(query);

    if (isMongoId) {
        const category = await Category.findById(query);
        return res.json({
            results: (category) ? [category] : []
        });
    }

    const regex = new RegExp(query, 'i');

    const category = await Category.find({ name: regex, status: true });

    res.json({
        results: category
    });
}


const searchProducts = async (query = '', res = response) => {
    const isMongoId = isValidObjectId(query);

    if (isMongoId) {
        const product = await Product.findById(query)
            .populate('category', 'name');
        return res.json({
            results: (product) ? [product] : []
        });
    }

    const regex = new RegExp(query, 'i');

    const products = await Product.find({ 
        $or: [{ name: regex }, { description: regex }],
        $and: [{ status: true }]
     })
        .populate('category', 'name');;

    res.json({
        results: products
    });
}

const searchUser = async (query = '', res = response) => {
    const isMongoId = isValidObjectId(query);

    if (isMongoId) {
        const user = await User.findById(query);
        return res.json({
            results: (user) ? [user] : []
        });
    }

    const regex = new RegExp(query, 'i');

    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }]
    });

    res.json({
        results: users
    });
}

const search = async (req = request, res = response) => {
    const { collection, query } = req.params;

    if (!collectionsLicensed.includes(collection)) {
        return res.status(400).json({
            message: `Calecciones permitidas: ${collectionsLicensed}`
        });
    }

    switch (collection) {
        case 'categories':
            searchCategories(query, res);
            break;
        case 'products':
            searchProducts(query, res);
            break;
        case 'users':
            searchUser(query, res);
            break;
        default:
            res.status(500).json({
                message: `Olvidé hacer esta búsqueda ${key}`
            });
            break;
    }

}

module.exports = {
    search
}