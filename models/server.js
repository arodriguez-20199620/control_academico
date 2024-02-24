const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.cursoPath = '/api/cursos';
        this.authPath = '/api/auth'

        this.conectarDB();
        this.middlewares();
        this.routes();

    }

    async conectarDB() {
        await dbConnection();
    }

    routes() {
        this.app.use(this.cursoPath, require('../routers/curso.routes'));
        this.app.use(this.authPath, require('../routers/auth.routes'));
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor ejecutado y escuchando en el puerto', this.port);
        });
    }
}

module.exports = Server;