const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUsers = async(req = request, res = response) => {
    // const { query, name, apikey, page = 1, limit = 10 } = req.query;

    const { offset = 0, limit = 10 } = req.query;
    const queryStatus = { status: true };

    const [totalUsers, users] = await Promise.all([
        User.countDocuments(queryStatus),
        User.find(queryStatus)
        .skip(Number(offset))
        .limit(Number(limit))
    ]);
    
    res.json({
        totalUsers,
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

    res.json(user);
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

    res.json(user);
}

const patchUsers = (req, res = response) => {
    res.json({
        message: 'Patch API - Controller'
    });
}

const deleteUsers = async(req, res = response) => {

    const { id } = req.params;

    const user = await User.findByIdAndUpdate( id, {status: false}, {new: true} );

    // const authenticatedUser = req.authenticatedUser;

    res.json(user);
}


module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
}