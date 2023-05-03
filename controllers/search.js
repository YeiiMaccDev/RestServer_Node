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

const searchUser = async (query = '', res = response) => {
    const isMongoId = isValidObjectId(query);

    if (isMongoId) {
        const user = await User.findById(query);
        res.json({
            results: (user) ? [user] : []
        });
    }


    res.json({
        results: []
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

            break;
        case 'products':

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