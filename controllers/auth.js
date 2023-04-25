const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/generateJWT");
const { googleVerify } = require("../helpers/google-verify,js");



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


const googleSignIn = async(req = request, res = response) => {
    const { id_token} = req.body;

    try {
        const { name, picture, email} = await googleVerify(id_token);

        res.json({
            message: 'Google token ',
            id_token,
            name,
            picture,
            email
        }); 

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'El Token no se pudo verificar.'
        });
    }
    
    
}

module.exports = {
    login,
    googleSignIn
}