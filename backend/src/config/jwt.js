// valores padrao pra API funcionar mesmo sem .env criado
const segredo = process.env.JWT_SECRET || 'segredo_padrao_desenvolvimento';
const expiraEm = process.env.JWT_EXPIRES_IN || '1d';

module.exports = { segredo, expiraEm };
