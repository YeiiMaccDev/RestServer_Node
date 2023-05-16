const dbValidators = require('./db-validators');
const generateJWT = require('./generateJWT');
const googleVeryfy = require('./google-verify');
const uploadsFiles = require('./uploads-files');


module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...googleVeryfy,
    ...uploadsFiles
}