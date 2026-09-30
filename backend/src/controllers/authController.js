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
        res.status(401).json({ error: 'Email ou senha inválidos' });
    }
};

module.exports = { login };
