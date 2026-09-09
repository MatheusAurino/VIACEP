const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelize } = require('../instances/database');

class Usuario extends Model {
    verificarSenha(senha) {
        return bcrypt.compare(senha, this.senha);
    }
}

Usuario.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Usuario',
        tableName: 'usuarios',
        timestamps: true,
        hooks: {
            beforeSave: async (usuario) => {
                if (usuario.changed('senha')) {
                    usuario.senha = await bcrypt.hash(usuario.senha, 10);
                }
            }
        }
    }
);

module.exports = Usuario;
