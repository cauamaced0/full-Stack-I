const express = require('express');
const LoginController = require('./Controller/LoginController');
const LoginRoute = require('./Router/LoginRouter');
const server = express();
const PORT = 4200;

server.use(express.json());

server.set('view engine','ejs');
server.set("views", './Views');

let loginrota = new LoginRoute();
server.use('/', loginrota.router);

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});