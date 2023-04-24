const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
    const existsRole = await Role.findOne({ role });
    if (!existsRole) {
        throw new Error(`El rol ${role} no está registrado en la DB`);
    }
}

const existsEmail = async(email = '') => {
    const exists = await User.findOne({ email });

    if (exists) {
        throw new Error(`El email ${email}, ya está registrado.`);
    }
}


const existsUserById = async(id = '') => {
    const existsUser = await User.findById(id);

    if ( !existsUser ) {
        throw new Error(`El id ' ${id} ' no está registrado.`);
    }
}


module.exports = {
    isValidRole,
    existsEmail,
    existsUserById
}