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

    cadastrar(req, resp)
    {
        console.log(req.body);
        //Ler os dados do body,validar se estao corretos e
        //criar uma usuario model com esses dados para que sejam persistidos com o metodo
        //cadastrar da modelo
    }
}

module.exports = UsuarioController;