const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/generateJWT");



const login = async (req = request, res = response) => {
    try {
        const { email, password } = req.body;

        // Check if the email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'Usuario/Password no son correctos - Email'
            });
        }

        // Check if the user is active
        if (!user.status) {
            return res.status(400).json({
                message: 'Usuario/Password no son correctos - estado inactivo'
            });
        }

        // Check if the password matches
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                message: 'Usuario/Password no son correctos - Password.'
            });
        }

        // Generate the JWT
        const token = await generateJWT(user.id);

        res.json({
            message: 'Login ok',
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error de servidor.'
        });
    }

}

module.exports = {
    login
}