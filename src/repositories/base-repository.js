const Response = require('./models/response.js');
const { Op } = require('sequelize');

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
            this.response.message = error.toString();
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
            this.response.message = error.toString();
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
            this.response.message = error.toString();
        }
        return this.response;
    }

    async update(updatedEntity) {
        this.response = new Response();
        try {
            const response = await this.getById(updatedEntity.id);
            if (response && response.data && response.data[0]) {
                const entity = response.data[0];
                await entity.update(updatedEntity);
                this.response.data.push(updatedEntity);
                this.response.success = true;
            } else {
                this.response.setNotFoundMessage(updatedEntity.id);
            }
        } catch(error) {
            this.response.message = error.toString();
        }
        return this.response;
    }

    async delete(id) {
        this.response = new Response();
        try {
            const response = await this.getById(id);
            if (response && response.data && response.data[0]) {
                await this.model.destroy({
                    where: {
                        id
                    }
                });
                this.response.success = true;
            }
        } catch (error) {
            this.response.message = error.toString();
        }
        return this.response;
    }

    async filter(entity, startDate, endDate) {
        this.response = new Response();
        try {
            let createdAtGreaterThan = null;
            if (startDate) {
                createdAtGreaterThan = {
                    createdAt: {
                        [Op.gte]: startDate
                    }
                };
            }
            let createdAtLessThan = null;
            if (endDate) {
                createdAtLessThan = {
                    createdAt: {
                        [Op.lte]: endDate
                    }
                };
            }
            const entities = await this.model.findAll({
                where: {
                    [Op.and]: [
                        ...Object.keys(entity).map((key) => ({ [key]: entity[key] })),
                        createdAtGreaterThan,
                        createdAtLessThan
                    ]
                }
            });
            this.response.data = entities;
            this.response.success = true;
        } catch(error) {
            this.response.message = error.toString();
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
            this.response.message = error.toString();
        }
        return this.response;
    }
}