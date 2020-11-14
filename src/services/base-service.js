module.exports = class BaseService {
    constructor(repository) {
        this.repository = repository;
    }

    async getAll() {
        return await this.repository.getAll();
    }

    async getById(id) {
        return await this.repository.getById(id);
    }

    async create(entity) {
        return await this.repository.create(entity);
    }

    async update(entity) {
        return await this.repository.update(entity);
    }

    async delete(id) {
        return await this.repository.delete(id);
    }

    async filter(entity, startDate, endDate) {
        return await this.repository.filter(entity, startDate, endDate);
    }

    async createMany(entities) {
        return await this.repository.createMany(entities);
    }
}