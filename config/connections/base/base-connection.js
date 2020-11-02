const { Sequelize } = require('sequelize');
const database = require('./base-database.json');

const sequelize = new Sequelize({
    dialect: database.dialect,
    dialectModule: require('msnodesqlv8/lib/sequelize'),
    bindParam: false,
    dialectOptions: {
        options: {
            connectionString: `Driver={${database.driver}};Server=${database.server};Database=${database.databaseName};Trusted_Connection=${database.trustedConnection};`
        }
    }
});

module.exports = sequelize;