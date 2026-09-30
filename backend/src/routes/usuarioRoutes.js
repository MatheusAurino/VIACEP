const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authController = require('../controllers/authController');
const { autenticar } = require('../middlewares/authMiddleware');

// POST /login -> publica
router.post('/login', authController.login);

// POST /usuarios -> cria (publica, qualquer um pode se cadastrar)
router.post('/usuarios', usuarioController.criarUsuario);

// as rotas abaixo exigem token no body
router.get('/usuarios', autenticar, usuarioController.buscarUsuarios);
router.get('/usuarios/:id', autenticar, usuarioController.buscarUsuarioPorId);
router.put('/usuarios/:id', autenticar, usuarioController.atualizarUsuario);
router.delete('/usuarios/:id', autenticar, usuarioController.excluirUsuario);

module.exports = router;
