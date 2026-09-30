const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
    const token = req.body?.token;

    if (!token) {
        return res.status(401).json({ error: 'Token não enviado' });
    }

    try {
        const dados = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = dados;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
}

module.exports = { autenticar };
