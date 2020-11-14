const BaseService = require('./base-service.js');
const UsersRepository = require('../repositories/users-repository.js');

module.exports = class UsersService extends BaseService {
    constructor(model) {
        super(new UsersRepository(model));
    }

    async login(user) {
        return await this.repository.login(user);
    }
}