const { request, response } = require("express");

const { uploadsFiles } = require("../helpers");

const uploadFiles = async (req = request, res = response) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
            return res.status(400).json({
                message: 'No se ha cargado ningún archivo.'
            });
        }
        const name = await uploadsFiles(req.files);

        res.json(name);
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }


}

module.exports = {
    uploadFiles,
}