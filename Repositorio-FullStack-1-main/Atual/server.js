const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const routerHome = require("./routes/homeRoute");
const server = express();

//configurações do EJS
server.set("view engine", 'ejs')

//Expor a pasta de estilização/script para o navegador
server.use(express.static('public'));

//Configuração arquivo de Layout
server.set('layout', './layout.ejs');
server.use(expressEjsLayouts);

//Configuração para as requisições POST (Submissão)
server.use(express.urlencoded({extended: true}));


server.use("/", routerHome);

server.listen(5000, function() {
    console.log("servidor web em funcionamento!");
})
