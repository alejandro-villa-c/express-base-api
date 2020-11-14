const BaseRepository = require('./base-repository.js');
const Response = require('./models/response.js');

module.exports = class UsersRepository extends BaseRepository {
    constructor(model) {
        super(model);
    }

    async login(user) {
        this.response = new Response();
        try {
            const users = await this.model.findAll({
                where: {
                   username: user.username,
                   password: user.password
                }
            });
            if (users.length === 0) {
                this.response.message = `Incorrect username or password.`;
            } else {
                this.response.data.push(users[0]);
                this.response.success = true;
            }
        } catch(error) {
            this.response.message = error.toString();
        }
        return this.response;
    }
}