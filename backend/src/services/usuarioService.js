const Usuario = require('../models/Usuario');

const SEM_SENHA = { attributes: { exclude: ['senha'] } };

const obterTodosUsuarios = async () => {
    return Usuario.findAll(SEM_SENHA);
};

const obterUsuarioPorId = async (id) => {
    return Usuario.findByPk(id, SEM_SENHA);
};

const criarUsuario = async ({ nome, email, senha }) => {
    const usuario = await Usuario.create({ nome, email, senha });
    return obterUsuarioPorId(usuario.id);
};

const atualizarUsuario = async (id, { nome, email, senha }) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return null;
    }

    usuario.nome = nome ?? usuario.nome;
    usuario.email = email ?? usuario.email;
    if (senha) {
        usuario.senha = senha;
    }

    await usuario.save();
    return obterUsuarioPorId(usuario.id);
};

const excluirUsuario = async (id) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return false;
    }

    await usuario.destroy();
    return true;
};

module.exports = {
    obterTodosUsuarios,
    obterUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    excluirUsuario
};
