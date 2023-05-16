const { request, response } = require("express");
const path = require("path");

const uploadFiles = (req = request, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({
            message: 'No files were uploaded.'
        });
    }

    const { file } = req.files;

    const nameCutout = file.name.split('.');
    const extension = nameCutout[ nameCutout.length - 1 ];

    // Validating file extensions.
    const extensionsValid = ['png', 'jpg', 'jpeg'];
     if ( ! extensionsValid.includes(extension) ) {
        return res.status(400).json({
            message: `Invalid file extension: ${extension}  . Extensions valid : ${extensionsValid}.`
        });
     }

    console.log(file)

    res.json({
        extension
    })

    // const uploadPath = path.join( __dirname, '../uploads/', file.name);

    // file.mv(uploadPath, (err) => {
    //     if (err) {
    //         return res.status(500).json({err});
    //     }

    //     res.json({
    //         message: 'File uploaded to ' + uploadPath
    //     });
    // });
}

module.exports = {
    uploadFiles,
}