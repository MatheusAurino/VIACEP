require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/instances/database');
require('./src/models/Usuario');
const usuarioRoutes = require('./src/routes/usuarioRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api', usuarioRoutes);
// Rotas completas: GET/POST /api/usuarios, GET/PUT/DELETE /api/usuarios/:id

app.get('/', (req, res) => {
    res.send('API de usuários rodando!');
});

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
});
