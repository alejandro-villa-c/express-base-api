const setBaseRoutes = (router, service) => {
    router.get('/', async (req, res, next) => {
        const response = await service.getAll();
        res.json(response);
    });

    router.get('/:id', async (req, res, next) => {
        if (req.params && req.params.id) {
            const response = await service.getById(req.params.id);
            res.json(response);
        } else {
            res.status(400).send(`Missing route parameter 'id'.`);
        }
    });

    router.post('/', async (req, res, next) => {
        const response = await service.create(req.body);
        res.json(response);
    });

    router.put('/', async (req, res, next) => {
        const response = await service.update(req.body);
        res.json(response);
    });

    router.delete('/:id', async (req, res, next) => {
        if (req.params && req.params.id) {
            const response = await service.delete(req.params.id);
            res.json(response);
        } else {
            res.status(400).send(`Missing route parameter 'id'.`);
        }
    });

    router.post('/filter', async (req, res, next) => {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const response = await service.filter(req.body, startDate, endDate);
        res.json(response);
    });

    router.post('/createMany', async (req, res, next) => {
        const response = await service.createMany(req.body);
        res.json(response);
    });
}

module.exports = setBaseRoutes;
