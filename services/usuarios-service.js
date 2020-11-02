const BaseService = require('./base-service.js');
const UsuariosRepository = require('../repositories/usuarios-repository.js');

module.exports = class UsuariosService extends BaseService {
    constructor(model) {
        super(new UsuariosRepository(model));
    }

    async login(usuario) {
        return await this.repository.login(usuario);
    }
}