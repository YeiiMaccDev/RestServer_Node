const { request, response } = require("express");

const { uploadsFiles } = require("../helpers");

const uploadFiles = async (req = request, res = response) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
            return res.status(400).json({
                message: 'No se ha cargado ningún archivo.'
            });
        }
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

const updateImage = async(req = request, res = response) => {
    const { id, collection} = req.params;
    
    res.json({ id, collection});
}

module.exports = {
    uploadFiles,
    updateImage
}