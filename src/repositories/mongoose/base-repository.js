const Response = require('../models/response.js');

module.exports = class BaseRepository {
    constructor(model) {
        this.model = model;
        this.response = new Response();
    }

    async getAll(sortBy, page, perPage) {
        this.response = new Response();
        try {
            let sortByExpression = {};
            if (sortBy) {
                const [propertyToSortBy, direction] = sortBy.split('.');
                sortByExpression = {
                    [propertyToSortBy]: direction
                };
            }
            const entities = await this.model
                .find({})
                .sort(sortByExpression)
                .limit(perPage)
                .skip(perPage * (page - 1));
            const entitiesCount = await this.model.countDocuments({});
            this.response.data = entities;
            this.response.success = true;
            this.response.totalRecords = entitiesCount;
        } catch (error) {
            this.response.message = error.toString();
        }
        return this.response;
    }

    async getById(id) {
        this.response = new Response();
        try {
            const entity = await this.model.findById(id).exec();
            if (!entity) {
                this.response.setNotFoundMessage(id);
            } else {
                this.response.data.push(entity);
                this.response.success = true;
            }
        } catch (error) {
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
        } catch (error) {
            this.response.message = error.toString();
        }
        return this.response;
    }

    async update(updatedEntity) {
        this.response = new Response();
        try {
            const response = await this.model.update({ _id: updatedEntity.id }, updatedEntity);
            if (response.n > 0) {
                this.response.data.push(updatedEntity);
                this.response.success = true;
            } else {
                this.response.setNotFoundMessage(updatedEntity.id);
            }
        } catch (error) {
            this.response.message = error.toString();
        }
        return this.response;
    }

    async delete(id) {
        this.response = new Response();
        try {
            const response = await this.model.remove({ _id: id }, { single: true });
            if (response.deletedCount > 0) {
                this.response.success = true;
            } else {
                this.response.setNotFoundMessage(id);
            }
        } catch (error) {
            this.response.message = error.toString();
        }
        return this.response;
    }

    async filter(entity, sortBy, page, perPage, startDate, endDate) {
        this.response = new Response();
        try {
            let findQuery = {
                ...entity
            };
            let createdAt = {};
            if (startDate) {
                createdAt = {
                    $gte: new Date(startDate)
                };
            }
            if (endDate) {
                createdAt = {
                    ...createdAt,
                    $lte: new Date(endDate)
                };
            }
            if (startDate || endDate) {
                findQuery = {
                    ...findQuery,
                    createdAt
                };
            }
            let sortByExpression = {};
            if (sortBy) {
                const [propertyToSortBy, direction] = sortBy.split('.');
                sortByExpression = {
                    [propertyToSortBy]: direction
                };
            }
            const entities = await this.model
                .find(findQuery)
                .sort(sortByExpression)
                .limit(perPage)
                .skip(perPage * (page - 1))
                .exec();
            const entitiesCount = await this.model.countDocuments({});
            this.response.data = entities;
            this.response.success = true;
            this.response.totalRecords = entitiesCount;
        } catch (error) {
            this.response.message = error.toString();
        }
        return this.response;
    }

    async createMany(entities) {
        this.response = new Response();
        try {
            const createManyQuery = entities.map((entity) => {
                return {
                    insertOne: {
                        document: entity
                    }
                };
            });
            const response = await this.model.bulkWrite(createManyQuery);
            if (response.nInserted > 0) {
                const insertedIds = Object.keys(response.insertedIds).map((key) => response.insertedIds[key]);
                const filterResponse = await this.filter({ _id: insertedIds });
                if (filterResponse.success) {
                    const createdEntities = filterResponse.data;
                    if (createdEntities && createdEntities.length > 0) {
                        this.response.data = createdEntities;
                    }
                }
            } else {
                this.response.data = response;
            }
            this.response.success = true;
        } catch (error) {
            this.response.message = error.toString();
        }
        return this.response;
    }
}