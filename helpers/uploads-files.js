const { v4: uuidv4 } = require('uuid');
const path = require("path"); 

const uploadsFiles = (files, extensionsValid = ['png', 'jpg', 'jpeg'], folderName = '') => {
    return new Promise((resolve, reject) => {
        const { file } = files;

        const nameCutout = file.name.split('.');
        const extension = nameCutout[nameCutout.length - 1];

        // Validating file extensions.
        if (!extensionsValid.includes(extension)) {
            return reject(`Extensión de archivo no válida:( .${extension} ), - Extensiones válidas : ${extensionsValid}.`);
        }

        const nameTemp = uuidv4() + '.' + extension;

        const uploadPath = path.join(__dirname, '../uploads/', folderName, nameTemp);

        console.log({folderName})
        console.log({extensionsValid})

        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }
            resolve(nameTemp);
        });
    });
}

module.exports = {
    uploadsFiles
}