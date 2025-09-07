const Database = require("../utils/database");

//classe responsável por representar a entidade usuario (tabela tb_usuario) e se comunicar com o banco de dados para a execução de comandos SQL
class UsuarioModel {

    #usuarioId;
    #usuarioNome;
    #usuarioEmail;
    #usuarioSenha;
    #usuarioAtivo;
    #perfilId;

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

    constructor(id, nome, email, senha, ativo, perfilId) {
        //é chamado no momento em que é feito um new na classe
        this.#usuarioId = id;
        this.#usuarioNome = nome;
        this.#usuarioEmail = email;
        this.#usuarioAtivo = ativo;
        this.#usuarioSenha = senha;
        this.#perfilId = perfilId; 
    }


    async listar() {
        const sql = "SELECT * FROM TB_USUARIO";

        const banco = new Database();

        const rows = await banco.ExecutaComando(sql);

        let listaUsuarioModel = [];
        for(let i = 0; i < rows.length; i++) {
            let usuario = new UsuarioModel();
            usuario.usuarioId = rows[i]["USU_ID"];
            usuario.usuarioNome = rows[i]["USU_NOME"];
            usuario.usuarioEmail = rows[i]["USU_EMAIL"];
            usuario.usuarioAtivo = rows[i]["USU_ATIVO"];
            usuario.perfilId = rows[i]["PER_ID"];

            listaUsuarioModel.push(usuario);
        }

        return listaUsuarioModel;
    }

    async cadastrar()
    {
        const sql = "insert into TB_USUARIO (USU_NOME, USU_EMAIL, USU_ATIVO, USU_SENHA, PER_ID) VALUES (?, ?, ?, ?, ?)";

        const valores = [this.#usuarioNome, this.#usuarioEmail, this.#usuarioAtivo, this.#usuarioSenha, this.#perfilId];

        const banco = new Database();
        const result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
    
    async buscarPorEmail(email) {
        let sql = "SELECT * FROM tb_usuario WHERE usuario_email = ?";
        let rows = await Database.query(sql, [email]);
        if (rows.length === 0) return null;

        let row = rows[0];
        return new UsuarioModel(row["usuario_id"], row["usuario_nome"], row["usuario_email"], row["usuario_senha"], row["usuario_ativo"], row["perfil_id"]);
    }
}

module.exports = UsuarioModel;