const UsuarioModel = require("../models/usuarioModel");

class UsuarioController {

    async listarView(req, res) {
        let usuario = new UsuarioModel();
        let lista = await usuario.listar();
        res.render('usuario/listar', {usuarios: lista});
    }
    
    cadastrarView(req, res) {
        //montagem do objeto via constructor
        let teste = new UsuarioModel(0, 'fulvio', 'fulano@unoeste.br', '123');

        //montagem do objeto via setter
        teste.usuarioSenha = '123';
        teste.usuarioNome = 'nome';
        res.render("usuario/cadastrar");
    }
}

module.exports = UsuarioController;