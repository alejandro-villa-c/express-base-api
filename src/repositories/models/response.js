module.exports = class Response {
    constructor() {
        this.data = [];
        this.success = false;
        this.message = null;
        this.totalRecords = null;
    }

    setNotFoundMessage(id) {
        this.message = `Can't find entity with id '${id}'.`;
    }
}