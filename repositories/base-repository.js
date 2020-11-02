const Response = require('./models/response.js');

module.exports = class BaseRepository {
    constructor(model) {
        this.model = model;
        this.response = new Response();
    }

    async getAll() {
        this.response = new Response();
        try {
            const entities = await this.model.findAll();
            this.response.data = entities;
            this.response.success = true;
        } catch(error) {
            this.response.message = error;
        }
        return this.response;
    }

    async getById(id) {
        this.response = new Response();
        try {
            const entities = await this.model.findAll({
                where: {
                   id
                }
            });
            if (entities.length === 0) {
                this.response.setNotFoundMessage(id);
            } else {
                this.response.data.push(entities[0]);
                this.response.success = true;
            }
        } catch(error) {
            this.response.message = error;
        }
        return this.response;
    }

    async create(entity) {
        this.response = new Response();
        try {
            const createdEntity = await this.model.create(entity);
            this.response.data.push(createdEntity);
            this.response.success = true;
        } catch(error) {
            this.response.message = error;
        }
        return this.response;
    }

    async createMany(entities) {
        this.response = new Response();
        try {
            const createdEntities = await this.model.bulkCreate(entities);
            this.response.data = createdEntities;
            this.response.success = true;
        } catch(error) {
            this.response.message = error;
        }
        return this.response;
    }

    async update(updatedEntity) {
        this.response = new Response();
        try {
            const entity = await this.getById(updatedEntity.id);
            if (entity) {
                await entity.update(updatedEntity);
                this.response.data.push(updatedEntity);
                this.response.success = true;
            } else {
                this.response.setNotFoundMessage(updatedEntity.id);
            }
        } catch(error) {
            this.response.message = error;
        }
        return this.response;
    }

    async delete(id) {
        this.response = new Response();
        try {
            await this.model.destroy({
                where: {
                    id
                }
            });
            this.response.success = true;
        } catch (error) {
            this.response.message = error;
        }
        return this.response;
    }

    async getByEntity(entity) {
        this.response = new Response();
        try {
            const entities = await this.model.findAll({
                where: entity
            });
            if (entities.length === 0) {
                this.response.message = `Can't find entity`;
            } else {
                this.response.data.push(entities[0]);
                this.response.success = true;
            }
        } catch(error) {
            this.response.message = error;
        }
        return this.response;
    }
}