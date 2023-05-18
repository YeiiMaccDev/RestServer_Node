const path = require("path");
const fs = require("fs");
const { request, response } = require("express");

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL);
const cloudinaryFolder =  process.env.CLOUDINARY_FOLDER


const { uploadsFiles, isValidFileFormat } = require("../helpers");
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

const updateImageCloudinary = async (req = request, res = response) => {
    const { isValid, message } = isValidFileFormat(req.files.file);
    if ( !isValid ) {
        return res.status(400).json({
            message 
        });
    }
   
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
        const name = model.img.split('/').pop();
        const [public_id] = name.split('.');
        cloudinary.uploader.destroy(`${cloudinaryFolder}/${collection}/${public_id}`);
    }

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {folder:`${cloudinaryFolder}/${collection}`});
    model.img = secure_url;
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

    const pathImg = path.join(__dirname, '../assets/no-image.png');
    if (fs.existsSync(pathImg)) {
        return res.sendFile( pathImg );
    }

    res.status(500).json({
        message: 'Image not found.'
    });

}

module.exports = {
    uploadFiles,
    updateImage,
    updateImageCloudinary,
    getImage,
}