var express = require('express');
var router = express.Router();
const usuario = require('../config/connections/base/models/usuario.js');
const UsuariosService = require('../services/usuarios-service.js');
const usuariosService = new UsuariosService(usuario);
const setBaseRoutes = require('./base-routes.js');

setBaseRoutes(router, usuariosService);

router.post('/login', async (req, res, next) => {
    const response = await usuariosService.login(req.body);
    res.json(response);
});

module.exports = router;