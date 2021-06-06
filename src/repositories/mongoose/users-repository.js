const BaseRepository = require('./base-repository.js');
const Response = require('../models/response.js');

module.exports = class UsersRepository extends BaseRepository {
    constructor(model) {
        super(model);
    }

    async login(user) {
        this.response = new Response();
        try {
            const foundUser = await this.model.findOne({
                username: user.username,
                password: user.password
            }).exec();
            if (!foundUser) {
                this.response.message = `Incorrect username or password.`;
            } else {
                this.response.data.push(foundUser);
                this.response.success = true;
            }
        } catch (error) {
            this.response.message = error.toString();
        }
        return this.response;
    }
}