const { request, response } = require("express");



const search = async(req = request, res = response) => {
    const { collection, query } = req.params;

    res.json({
        message: 'Buscar ... ',
        collection,
        query
    });
}

module.exports = {
    search
}