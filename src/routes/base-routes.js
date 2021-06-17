const setBaseRoutes = (router, service, middlewares = {
    getAll: (req, res, next) => next(),
    getById: (req, res, next) => next(),
    create: (req, res, next) => next(),
    update: (req, res, next) => next(),
    delete: (req, res, next) => next(),
    filter: (req, res, next) => next(),
    createMany: (req, res, next) => next()
}) => {
    router.get('/', middlewares.getAll, async (req, res, next) => {
        const sortBy = req.query.sortBy || 'createdAt.desc';
        const page = +(req.query.page) && +(req.query.page) > 0 ? +(req.query.page) : 1;
        const perPage = +(req.query.perPage) && +(req.query.perPage) > 0 ? +(req.query.perPage) : 20;
        const response = await service.getAll(sortBy, page, perPage);
        res.json(response);
    });

    router.get('/:id', middlewares.getById, async (req, res, next) => {
        if (req.params && req.params.id) {
            const response = await service.getById(req.params.id);
            res.json(response);
        } else {
            res.status(400).send(`Missing route parameter 'id'.`);
        }
    });

    router.post('/', middlewares.create, async (req, res, next) => {
        const response = await service.create(req.body);
        res.json(response);
    });

    router.put('/', middlewares.update, async (req, res, next) => {
        const response = await service.update(req.body);
        res.json(response);
    });

    router.delete('/:id', middlewares.delete, async (req, res, next) => {
        if (req.params && req.params.id) {
            const response = await service.delete(req.params.id);
            res.json(response);
        } else {
            res.status(400).send(`Missing route parameter 'id'.`);
        }
    });

    router.post('/filter', middlewares.filter, async (req, res, next) => {
        const sortBy = req.query.sortBy || 'createdAt.desc';
        const page = +(req.query.page) && +(req.query.page) > 0 ? +(req.query.page) : 1;
        const perPage = +(req.query.perPage) && +(req.query.perPage) > 0 ? +(req.query.perPage) : 20;
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const response = await service.filter(req.body, sortBy, page, perPage, startDate, endDate);
        res.json(response);
    });

    router.post('/createMany', middlewares.createMany, async (req, res, next) => {
        const response = await service.createMany(req.body);
        res.json(response);
    });
}

module.exports = setBaseRoutes;
