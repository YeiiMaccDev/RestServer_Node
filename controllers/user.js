const { response } = require('express');


const getUsers = (req, res = response) => {
    res.json({
        message: 'Get API - Controller'
    });
}

const postUsers = (req, res = response) => {
    res.json({
        message: 'Post API - Controller'
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