const { request, response } = require("express");

const { uploadsFiles } = require("../helpers");
const { User, Product } = require("../models");

const uploadFiles = async (req = request, res = response) => {
    try {
        // txt, md
        // const name = await uploadsFiles(req.files, ['txt', 'md'], 'texts');
        const name = await uploadsFiles(req.files, undefined, 'imgs');

        res.json(name);
    } catch (error) {
        res.status(400).json({
            message: error
        });
    }

}

const updateImage = async (req = request, res = response) => {
    const { id, collection } = req.params;
    let model;

    try {
        switch (collection) {
            case 'users':
                model = await User.findById(id);
                if (!model) {
                    return res.status(400).json({
                        message: `No existe un usuario con el id ${id}`
                    });
                }
                break;

            case 'products':
                model = await Product.findById(id);
                if (!model) {
                    return res.status(400).json({
                        message: `No existe un producto con el id ${id}`
                    });
                }
                break;

            default:
                return res.status(500).json({
                    message: `Olvidé hacer ${key} uploads`
                });
        }

        const nameFile = await uploadsFiles(req.files, undefined, collection);
        model.img = nameFile;
        await model.save();

        res.json(model);

    } catch (error) {
        res.status(400).json({
            message: error
        });
    }
}

module.exports = {
    uploadFiles,
    updateImage
}