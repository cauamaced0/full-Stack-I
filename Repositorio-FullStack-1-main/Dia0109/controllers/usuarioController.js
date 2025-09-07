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
        let nome = req.body.nome;
        let email = req.body.email;
        let senha = req.body.senha;
        let ativo = req.body.ativo;
        let perfil = req.body.perfil;
        if(nome && email && senha && ativo && perfil) {           
            let usuario = new UsuarioModel(0, nome, email, senha, ativo, perfil);
            let resultado = await usuario.cadastrar();
            if(resultado) {
                res.redirect("/usuario/listar");
            } else {
                res.render("usuario/cadastrar", {erro: "Erro ao cadastrar usuário"});
            }
        } else {
            res.render("usuario/cadastrar", {erro: "Preencha todos os campos"});
        }
        //Ler os dados do body,validar se estao corretos e
        //criar uma usuario model com esses dados para que sejam persistidos com o metodo
        //cadastrar da modelo
    }
     loginView(req, res) {
        res.render("usuario/login", {erro: null});
    }

    // 🔹 Validação de login
    async login(req, res) {
        let { email, senha } = req.body;

        if (!email || !senha) {
            return res.render("usuario/login", {erro: "Informe e-mail e senha"});
        }

        let usuario = await UsuarioModel.buscarPorEmail(email);

        if (!usuario) {
            return res.render("usuario/login", {erro: "Usuário não encontrado"});
        }

        if (usuario.usuarioSenha !== senha) {
            return res.render("usuario/login", {erro: "Senha incorreta"});
        }

        if (usuario.usuarioAtivo != 1) {
            return res.render("usuario/login", {erro: "Usuário inativo"});
        }

        // sucesso → redireciona para home
        res.redirect("/");
    }
}

module.exports = UsuarioController;