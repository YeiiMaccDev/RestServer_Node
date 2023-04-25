const { request, response } = require("express")

const isAdminRole = (req = request, res = response, next) => {

    if ( !req.authenticatedUser ) {
        return res.status(500).json({
            message: 'Quiere verificar el rol sin validar primero el token.'
        });
    }

    const { role, name } = req.authenticatedUser

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            message: `${name} no es un usuario Administrador. No puede realizar esta acción.`
        });
    }

    next();
}

const isRole = ( ...roles ) => {
    return (req = request, res = response, next) => {

        if ( !req.authenticatedUser ) {
            return res.status(500).json({
                message: 'Quiere verificar el rol sin validar primero el token.'
            });
        }

        if ( !roles.includes(req.authenticatedUser.role) ) {
            return res.status(401).json({
            message: `El servicio requiere uno de estos roles: ${roles} .`
            });
        }

        next();
    }
}

module.exports = {
    isAdminRole,
    isRole
}