import Usuario from "../models/user";

 export class usuarioController{

    constructor(){
        this.usuario=[];
    }

    addUser(req,res){
        const nome = req.body.nome;
        const email = req.body.email;

        const newUser = new Usuario(nome,email);
        this.users.push(newUser);
        res.send(`User ${name} adicionado com sucesso!` );
    }

    renderHome(req,res){
        res.render('home');
    }

    renderUsers(req,res){
        res.render('user',{Usuario: this.users});
    }
}

module.exports = usuarioController();