const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// GET /usuarios -> lista todos
router.get('/usuarios', usuarioController.buscarUsuarios);

// GET /usuarios/:id -> busca por id
router.get('/usuarios/:id', usuarioController.buscarUsuarioPorId);

// POST /usuarios -> cria
router.post('/usuarios', usuarioController.criarUsuario);

// PUT /usuarios/:id -> edita
router.put('/usuarios/:id', usuarioController.atualizarUsuario);

// DELETE /usuarios/:id -> exclui
router.delete('/usuarios/:id', usuarioController.excluirUsuario);

module.exports = router;
