
const express = require('express')
const cors = require('cors')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        // CORS
        this.app.use(cors());

        // Middleware
        this.middlewares();


        this.routes();
    }

    middlewares () {
        // Public directory
        this.app.use(express.static('public'))
    }


    routes() {
        this.app.get('/api', (req, res) => {
            res.json({
                message: 'Get API'
            })
        })

        this.app.post('/api', (req, res) => {
            res.json({
                message: 'Post API'
            })
        })

        this.app.put('/api', (req, res) => {
            res.json({
                message: 'Put API'
            })
        })

        this.app.delete('/api', (req, res) => {
            res.json({
                message: 'Delete API'
            })
        })
    }

    listen () {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port)
        });
    }
}

module.exports = Server;