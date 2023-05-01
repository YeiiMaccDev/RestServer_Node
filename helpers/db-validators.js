const { Category , User, Role} = require('../models');

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


const existsCategoryById = async(id = '') => {
    const existsCategory = await Category.findById(id);

    if ( !existsCategory ) {
        throw new Error(`El id ' ${id} ' no está registrado.`);
    }
}


module.exports = {
    isValidRole,
    existsEmail,
    existsCategoryById,
    existsUserById
}