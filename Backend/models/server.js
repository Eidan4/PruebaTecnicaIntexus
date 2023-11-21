const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
let {Server} = require('socket.io');

class Server1 {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 9000;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')
        this.io = new Server(this.server,{
            cors:{
                origin:'http://localhost:3000'
            }
        })
        this.path = {
            Pais:  '/api/paises',
            Ciudad:  '/api/ciudades',
        };

        this.connectDB();

        this.middlewares();

        this.routes();

        this.sockets();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());

        this.app.use( express.json() );

        this.app.use( express.static('public') );

        this.app.use( bodyParser.urlencoded({ extended: false }) );

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
    }

    routes() {
        this.app.use(this.path.Pais, require('../routes/Pais'));
        this.app.use(this.path.Ciudad, require('../routes/Ciudad'));
    }

    sockets(){
        this.io.on('connection', socket =>{
            console.log('Cliente Conectado', socket.id);

            socket.on('disconnect',()=>{
                console.log('Cliente desconetado', socket.id);
            })

        });
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

module.exports = Server1;