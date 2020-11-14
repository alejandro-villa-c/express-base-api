var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var swagger = require('./swagger');
var server = require('../config/server.json');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(cors());

//#region Routes
const indexRouter = require('./routes/index.js');
const usersRouter = require('./routes/users.js');
const docsUrl = '/api-docs/';
app.use('/', indexRouter);
app.use('/users', usersRouter);
//#endregion

app.use(docsUrl, swagger({
    apiName: 'Base API',
    host: `${server.hostname}:${server.port}`,
    schemes: ['http'],
    swaggerSpecFilePath: './swagger-spec.json',
    endpointsFiles: ['./src/routes/users.js'],
    docsUrl: docsUrl
}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    if (!req.url.includes(docsUrl)) {
        next(createError(404));
    } else {
        next();
    }
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(server.port, () => {
    const config = require('../config/config.json');
    const sequelize = require('../config/connections/base/base-connection.js');

    (async () => {
        try {
            await sequelize.authenticate();
            console.log(`Connection to '${config.development.database}' has been established successfully.`);
        } catch (error) {
            console.error(`Unable to connect to '${config.development.database}': `, error);
        }
    
        // await sequelize.sync({force: true});
        await sequelize.sync();
    })();

    console.log(`App listening at http://${server.hostname}:${server.port}`);
});

module.exports = app;
