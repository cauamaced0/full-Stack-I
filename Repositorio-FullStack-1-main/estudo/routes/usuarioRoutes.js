import express from 'express';
import { usuarioController } from '../controllers/usuarioController';
const router =express.Router();



router.get('/',usuarioController.renderHome);
router.get('/usuario',usuarioController.renderUsers);
router.post('usuario',usuarioController.addUser )

module.exports = router;