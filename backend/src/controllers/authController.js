const authService = require('../services/authService');

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: 'Informe email e senha' });
    }

    try {
        const resultado = await authService.login(email, senha);
        res.status(200).json(resultado);
    } catch (error) {
        if (error.message === 'CREDENCIAIS_INVALIDAS') {
            return res.status(401).json({ error: 'Email ou senha inválidos' });
        }
        console.error(error);
        res.status(500).json({ error: 'Erro interno ao fazer login' });
    }
};

module.exports = { login };
