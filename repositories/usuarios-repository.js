const BaseRepository = require('./base-repository.js');
const Response = require('./models/response.js');

module.exports = class UsuariosRepository extends BaseRepository {
    constructor(model) {
        super(model);
    }

    async login(usuario) {
        this.response = new Response();
        try {
            const usuarios = await this.model.findAll({
                where: {
                   nombreDeUsuario: usuario.nombreDeUsuario,
                   contrasena: usuario.contrasena
                }
            });
            if (usuarios.length === 0) {
                this.response.message = `Incorrect username or password.`;
            } else {
                this.response.data.push(usuarios[0]);
                this.response.success = true;
            }
        } catch(error) {
            this.response.message = error;
        }
        return this.response;
    }
}