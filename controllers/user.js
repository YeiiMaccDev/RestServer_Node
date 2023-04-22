const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUsers = (req = request, res = response) => {
    const {query, name, apikey, page = 1, limit = 10} = req.query;

    res.json({
        message: 'Get API - Controller',
        query, 
        name, 
        apikey, 
        page, 
        limit
    });
}

const postUsers = async(req, res = response) => {
    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});

    // Check if the email exists


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

const putUsers = (req, res = response) => {

    const { id } = req.params;
    res.json({
        message: 'Put API - Controller',
        id
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