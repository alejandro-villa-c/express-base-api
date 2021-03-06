const express = require('express');
const router = express.Router();
// const user = require('../../config/sequelize/connections/models/user.js');
const user = require('../../config/mongoose/models/user.js');
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
        #swagger.parameters['sortBy'] = {
            in: 'query',
            type: 'string',
            format: 'property.direction'
        }
        #swagger.parameters['page'] = {
            in: 'query',
            type: 'string'
        }
        #swagger.parameters['perPage'] = {
            in: 'query',
            type: 'string'
        }
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
        #swagger.parameters['sortBy'] = {
            in: 'query',
            type: 'string',
            format: 'property.direction'
        }
        #swagger.parameters['page'] = {
            in: 'query',
            type: 'string'
        }
        #swagger.parameters['perPage'] = {
            in: 'query',
            type: 'string'
        }
        #swagger.parameters['startDate'] = {
            in: 'query',
            type: 'string',
            format: 'yyyy-MM-ddTHH:mm:ss.SSSZ or yyyy-MM-ddTHH:mm:ss.SSS+00:00'
        }
        #swagger.parameters['endDate'] = {
            in: 'query',
            type: 'string',
            format: 'yyyy-MM-ddTHH:mm:ss.SSSZ or yyyy-MM-ddTHH:mm:ss.SSS+00:00'
        }
        #swagger.parameters['user'] = {
            in: 'body',
            type: 'object',
            schema: {
                $id: 1,
                $fullName: "John Doe",
                $username: "john",
                $password: "123"
            }
        }
    */
// #swagger.end
// #swagger.start
    /*
        #swagger.tags = ['Users']
        #swagger.path = '/users/createMany'
        #swagger.method = 'post'
        #swagger.parameters['users'] = {
            in: 'body',
            type: 'object',
            schema: [
                {
                    $fullName: "John Doe",
                    $username: "john",
                    $password: "123"
                }
            ],
            required: true
        }
    */
// #swagger.end
//#endregion