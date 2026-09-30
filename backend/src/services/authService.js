const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const login = async (email, senha) => {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
        throw new Error('CREDENCIAIS_INVALIDAS');
    }

    const confere = await usuario.verificarSenha(senha);
    if (!confere) {
        throw new Error('CREDENCIAIS_INVALIDAS');
    }

    const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return { token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } };
};

module.exports = { login };
