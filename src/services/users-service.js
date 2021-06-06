const BaseService = require('./base-service.js');
// const UsersRepository = require('../repositories/sequelize/users-repository.js');
const UsersRepository = require('../repositories/mongoose/users-repository.js');

module.exports = class UsersService extends BaseService {
    constructor(model) {
        super(new UsersRepository(model));
    }

    async login(user) {
        return await this.repository.login(user);
    }
}