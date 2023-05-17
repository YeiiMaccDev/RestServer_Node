const path = require("path");
const fs = require("fs");

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

    //  Delete previous images
    if (model.img) {
        const pathImg = path.join(__dirname, '../uploads', collection, model.img);
        if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg);
        }
    }

    const nameFile = await uploadsFiles(req.files, undefined, collection);
    model.img = nameFile;
    await model.save();

    res.json(model);

}

const getImage = async(req = request, res = response) => {
    const { id, collection } = req.params;
    let model;

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

    if (model.img) {
        const pathImg = path.join(__dirname, '../uploads', collection, model.img);
        if (fs.existsSync(pathImg)) {
            return res.sendFile( pathImg );
        }
    }


    res.json({
        message: 'Image not found.'
    });

}

module.exports = {
    uploadFiles,
    updateImage,
    getImage
}