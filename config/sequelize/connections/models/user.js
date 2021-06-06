const { DataTypes, Model } = require('sequelize');
const sequelize = require('../base-connection.js');

class User extends Model {}

User.init({
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'users'
});

module.exports = sequelize.models.User;