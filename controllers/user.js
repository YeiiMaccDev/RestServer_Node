const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUsers = async(req = request, res = response) => {
    // const { query, name, apikey, page = 1, limit = 10 } = req.query;

    const { offset = 0, limit = 10 } = req.query;
    const users = await User.find()
        .skip(Number(offset))
        .limit(Number(limit));
    res.json({
        message: 'Get API - Controller',
        users
    });
}

const postUsers = async (req, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });


    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Save to DB
    await user.save();

    res.json({
        message: 'Post API - Controller',
        user
    });
}

const putUsers = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...data } = req.body;

    if (password) {
        // Encrypt password
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, data, {new: true} );

    res.json({
        message: 'Put API - Controller...',
        user,
    });
}

const patchUsers = (req, res = response) => {
    res.json({
        message: 'Patch API - Controller'
    });
}

const deleteUsers = (req, res = response) => {
    res.json({
        message: 'Delete API - Controller'
    });
}


module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
}