const { DataTypes, Model } = require('sequelize');
const sequelize = require('../base-connection.js');

class Usuario extends Model {}

Usuario.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombreDeUsuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'usuarios'
});

module.exports = sequelize.models.Usuario;