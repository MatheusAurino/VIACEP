const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validarCriacao = ({ nome, email, senha }) => {
    if (!nome || nome.trim().length < 2) {
        return 'Nome é obrigatório e deve ter ao menos 2 caracteres.';
    }
    if (!email || !EMAIL_REGEX.test(email)) {
        return 'Informe um e-mail válido.';
    }
    if (!senha || senha.length < 4) {
        return 'Senha é obrigatória e deve ter ao menos 4 caracteres.';
    }
    return null;
};

const validarAtualizacao = ({ nome, email, senha }) => {
    if (nome !== undefined && nome.trim().length < 2) {
        return 'Nome deve ter ao menos 2 caracteres.';
    }
    if (email !== undefined && !EMAIL_REGEX.test(email)) {
        return 'Informe um e-mail válido.';
    }
    if (senha !== undefined && senha.length < 4) {
        return 'Senha deve ter ao menos 4 caracteres.';
    }
    return null;
};

const validarId = (id) => {
    return /^\d+$/.test(String(id));
};

module.exports = { validarCriacao, validarAtualizacao, validarId };
