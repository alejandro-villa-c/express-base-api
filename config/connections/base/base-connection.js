const { Sequelize } = require('sequelize');
const config = require('../../config.json');

const sequelize = new Sequelize({
    dialect: config.development.dialect,
    dialectModule: require(config.development.dialectModulePath),
    bindParam: false,
    dialectOptions: config.development.dialectOptions
});

module.exports = sequelize;