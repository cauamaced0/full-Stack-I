const express = require('express');
const UsuarioController = require('../controllers/usuarioController');

const router = express.Router();

let ctrl = new UsuarioController();
router.get("/", ctrl.listarView);
router.get("/cadastrar", ctrl.cadastrarView);
router.post("/cadastrar", ctrl.cadastrar);
router.post("/excluir", ctrl.excluir);
router.get("/alterar/:id", ctrl.alterarView);

module.exports = router;