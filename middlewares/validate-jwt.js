const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const tokenName = 'x-token';

const validateJWT = (req = request, res = response, next) => {
    const token = req.header(tokenName);
    if (!token) {
        return res.status(401).json({
            message: 'No hay token en la petición.'
        });
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        console.log(uid);
        req.uid = uid;
        
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: 'Token no válido.'
        });
    }

}

module.exports = {
    validateJWT
}