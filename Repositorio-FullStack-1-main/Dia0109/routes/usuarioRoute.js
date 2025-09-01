const express = require('express');
const UsuarioController = require('../controllers/usuarioController');

const router = express.Router();

let ctrl = new UsuarioController();
router.get("/", ctrl.listarView);
router.get("/cadastrar", ctrl.cadastrarView);
router.post("/cadastrar", ctrl.cadastrar);

module.exports = router;