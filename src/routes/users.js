var express = require('express');
var router = express.Router();
const user = require('../../config/connections/base/models/user.js');
const UsersService = require('../services/users-service.js');
const usersService = new UsersService(user);
const setBaseRoutes = require('./base-routes.js');

setBaseRoutes(router, usersService);

router.post('/login', async (req, res, next) => {
    /* 
        #swagger.tags = ['Users']
        #swagger.path = '/users/login'
        #swagger.parameters['user'] = {
            in: 'body',
            type: 'object',
            schema: {
                $username: "john",
                $password: "123"
            },
            required: true
        }
    */
    const response = await usersService.login(req.body);
    res.json(response);
});

module.exports = router;

//#region Swagger specification
// #swagger.start
    /*
        #swagger.tags = ['Users']
        #swagger.path = '/users'
        #swagger.method = 'get'
    */
// #swagger.end
// #swagger.start
    /*
        #swagger.tags = ['Users']
        #swagger.path = '/users/{id}'
        #swagger.method = 'get'
        #swagger.parameters['id'] = {
            in: 'path',
            required: true
        }
    */
// #swagger.end
// #swagger.start
    /*
        #swagger.tags = ['Users']
        #swagger.path = '/users'
        #swagger.method = 'post'
        #swagger.parameters['user'] = {
            in: 'body',
            type: 'object',
            schema: {
                $fullName: "John Doe",
                $username: "john",
                $password: "123"
            },
            required: true
        }
    */
// #swagger.end
// #swagger.start
    /*
        #swagger.tags = ['Users']
        #swagger.path = '/users'
        #swagger.method = 'put'
        #swagger.parameters['user'] = {
            in: 'body',
            type: 'object',
            schema: {
                $id: 1,
                $fullName: "John Doe",
                $username: "john",
                $password: "123"
            },
            required: true
        }
    */
// #swagger.end
// #swagger.start
    /*
        #swagger.tags = ['Users']
        #swagger.path = '/users/{id}'
        #swagger.method = 'delete'
        #swagger.parameters['id'] = {
            in: 'path',
            required: true
        }
    */
// #swagger.end
// #swagger.start
    /*
        #swagger.tags = ['Users']
        #swagger.path = '/users/filter'
        #swagger.method = 'post'
        #swagger.parameters['startDate'] = {
            in: 'query',
            type: 'string',
            format: 'yyyy-MM-ddTHH:mm:ss.SSSZ'
        }
        #swagger.parameters['endDate'] = {
            in: 'query',
            type: 'string',
            format: 'yyyy-MM-ddTHH:mm:ss.SSSZ'
        }
        #swagger.parameters['user'] = {
            in: 'body',
            type: 'object',
            schema: {
                id: 1,
                fullName: "John Doe",
                username: "john",
                password: "123"
            }
        }
    */
// #swagger.end
//#endregion