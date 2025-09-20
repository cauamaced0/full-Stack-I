const Database = require("../utils/database");

//classe responsável por representar a entidade usuario (tabela tb_usuario) e se comunicar com o banco de dados para a execução de comandos SQL
class UsuarioModel {

    #usuarioId;
    #usuarioNome;
    #usuarioEmail;
    #usuarioSenha;
    #usuarioAtivo;
    #perfilId;
    #perfilDescricao;

    get usuarioId() {
        return this.#usuarioId;
    }

    set usuarioId(value) {
        this.#usuarioId = value;
    }

    get usuarioNome() {
        return this.#usuarioNome;
    }

    set usuarioNome(value) {
        this.#usuarioNome = value;
    }

    get usuarioEmail() {
        return this.#usuarioEmail;
    }

    set usuarioEmail(value) {
        this.#usuarioEmail = value;
    }

    get usuarioSenha() {
        return this.#usuarioSenha;
    }

    set usuarioSenha(value) {
        this.#usuarioSenha = value;
    }

    get usuarioAtivo() {
        return this.#usuarioAtivo;
    }

    set usuarioAtivo(value) {
        this.#usuarioAtivo = value;
    }

    get perfilId() {
        return this.#perfilId;
    }

    set perfilId(value) {
        this.#perfilId = value;
    }

    get perfilDescricao() {
        return this.#perfilDescricao;
    }

    set perfilDescricao(value) {
        this.#perfilDescricao = value;
    }

    constructor(id, nome, email, senha, ativo, perfilId, perfilDescricao) {
        //é chamado no momento em que é feito um new na classe
        this.#usuarioId = id;
        this.#usuarioNome = nome;
        this.#usuarioEmail = email;
        this.#usuarioAtivo = ativo;
        this.#usuarioSenha = senha;
        this.#perfilId = perfilId; 
        this.#perfilDescricao = perfilDescricao;
    }


    async listar() {
        const sql = "SELECT * FROM TB_USUARIO U INNER JOIN TB_PERFIL P ON U.PER_ID = P.PER_ID";

        const banco = new Database();

        const rows = await banco.ExecutaComando(sql);

        let listaUsuarioModel = [];
        for(let i = 0; i < rows.length; i++) {
            let usuario = new UsuarioModel();
            usuario.usuarioId = rows[i]["USU_ID"];
            usuario.usuarioNome = rows[i]["USU_NOME"];
            usuario.usuarioEmail = rows[i]["USU_EMAIL"];
            if(rows[i]["USU_ATIVO"] == 1)
                usuario.usuarioAtivo = "Sim"
            else
                usuario.usuarioAtivo = "Não"
            usuario.perfilId = rows[i]["PER_ID"];
            usuario.perfilDescricao = rows[i]["PER_DESCRICAO"];

            listaUsuarioModel.push(usuario);
        }

        return listaUsuarioModel;
    }

    async cadastrar() {
        const sql = "INSERT INTO TB_USUARIO (USU_NOME, USU_EMAIL, USU_ATIVO, USU_SENHA, PER_ID) VALUES (?, ?, ?, ?, ?)";

        const valores = [this.#usuarioNome, this.#usuarioEmail, this.#usuarioAtivo, this.#usuarioSenha, this.#perfilId];

        const banco = new Database();
        const result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async excluir(id) {
        const sql = "DELETE FROM TB_USUARIO WHERE USU_ID = ?";
        const valores = [id];

        let banco = new Database();
        const result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async buscarPorId(id) {
        const sql = "SELECT * FROM TB_USUARIO WHERE USU_ID = ?";
        const valores = [id];

        let banco = new Database();
        const rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let usuario = new UsuarioModel(rows[0]["USU_ID"], rows[0]["USU_NOME"], rows[0]["USU_EMAIL"], rows[0]["USU_SENHA"], rows[0]["USU_ATIVO"], rows[0]["PER_ID"]);
            return usuario;
        }

        return null;
    }

}

module.exports = UsuarioModel;