const Role = require('../models/role');

const isValidRole = async(role = '') => {
    const existsRole = await Role.findOne({ role});
    if ( ! existsRole ) {
        throw new Error(`El rol ${ role} no está registrado en la DB`);
    }
}

module.exports = {
    isValidRole
}