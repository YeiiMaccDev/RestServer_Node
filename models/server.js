
const express = require('express')
const cors = require('cors')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.usersPath = '/api/users';

        // Middleware
        this.middlewares();


        this.routes();
    }

    middlewares () {

        // CORS
        this.app.use(cors());

        // Reading and parsing of received data.
        this.app.use( express.json() );

        // Public directory
        this.app.use(express.static('public'))
    }


    routes() {
        this.app.use(this.usersPath, require('../routes/user'))
    }


    listen () {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port)
        });
    }
}

module.exports = Server;