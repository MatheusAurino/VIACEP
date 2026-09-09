const usuarioService = require('../services/usuarioService');
const { validarCriacao, validarAtualizacao, validarId } = require('../validators/usuarioValidator');

const buscarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.obterTodosUsuarios();
        res.status(200).json({ data: usuarios });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno ao buscar usuários' });
    }
};

const buscarUsuarioPorId = async (req, res) => {
    const { id } = req.params;

    if (!validarId(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    try {
        const usuario = await usuarioService.obterUsuarioPorId(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(200).json({ data: usuario });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno ao buscar usuário' });
    }
};

const criarUsuario = async (req, res) => {
    const erro = validarCriacao(req.body);
    if (erro) {
        return res.status(400).json({ error: erro });
    }

    try {
        const usuario = await usuarioService.criarUsuario(req.body);
        res.status(201).json({ data: usuario });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Já existe um usuário com este e-mail' });
        }
        res.status(500).json({ error: 'Erro interno ao criar usuário' });
    }
};

const atualizarUsuario = async (req, res) => {
    const { id } = req.params;

    if (!validarId(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    const erro = validarAtualizacao(req.body);
    if (erro) {
        return res.status(400).json({ error: erro });
    }

    try {
        const usuario = await usuarioService.atualizarUsuario(id, req.body);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(200).json({ data: usuario });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Já existe um usuário com este e-mail' });
        }
        res.status(500).json({ error: 'Erro interno ao atualizar usuário' });
    }
};

const excluirUsuario = async (req, res) => {
    const { id } = req.params;

    if (!validarId(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    try {
        const excluido = await usuarioService.excluirUsuario(id);
        if (!excluido) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno ao excluir usuário' });
    }
};

module.exports = {
    buscarUsuarios,
    buscarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    excluirUsuario
};
