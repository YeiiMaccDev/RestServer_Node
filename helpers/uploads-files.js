const { v4: uuidv4 } = require('uuid');
const path = require("path");


const isValidFileFormat = (file, extensionsValid = ['png', 'jpg', 'jpeg', 'webp']) => {
    const extension = file.name.split('.').pop();
    const isValid = extensionsValid.includes(extension);
    const message = isValid ? '' : `Extensión de archivo no válida: (${extension}), Extensiones válidas: ${extensionsValid}.`;

    return {
        isValid,
        message
    };
}

const uploadsFiles = (files, extensionsValid = ['png', 'jpg', 'jpeg'], folderName = '') => {
    return new Promise((resolve, reject) => {
        const { file } = files;

        const extension = file.name.split('.').pop();

        // Validating file extensions.
        const { isValid, message } = isValidFileFormat(req.files.file);
        if ( !isValid ) {
            return reject(message);
        }

        const nameTemp = uuidv4() + '.' + extension;

        const uploadPath = path.join(__dirname, '../uploads/', folderName, nameTemp);


        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }
            resolve(nameTemp);
        });
    });
}

module.exports = {
    uploadsFiles,
    isValidFileFormat
}