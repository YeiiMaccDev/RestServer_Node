const { response } = require('express');


const getUsers = (req, res = response) => {
    res.json({
        message: 'Get API - Controller'
    });
}

const postUsers = (req, res = response) => {
    const {name, age} = req.body;

    res.json({
        message: 'Post API - Controller',
        name,
        age
    });
}

const putUsers = (req, res = response) => {
    res.json({
        message: 'Put API - Controller'
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