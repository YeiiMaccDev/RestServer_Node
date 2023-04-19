const { request, response } = require('express');


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

const postUsers = (req, res = response) => {
    const {name, age} = req.body;

    res.json({
        message: 'Post API - Controller',
        name,
        age
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