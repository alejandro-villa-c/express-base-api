const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const swagger = require('./swagger');
const server = require('../config/server.json');

const app = express();

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
app.use('/', indexRouter);
app.use('/users', usersRouter);
const docsUrl = '/api-docs';
app.use(docsUrl, swagger({
    apiName: 'Base API',
    host: `${server.hostname}:${server.port}`,
    schemes: ['http'],
    swaggerSpecFilePath: './swagger-spec.json',
    endpointsFiles: [
        './src/routes/users.js'
    ],
    docsUrl: docsUrl
}));
//#endregion

// catch 404 and forward to error handler
app.use((req, res, next) => {
    if (!req.url.includes(docsUrl)) {
        next(createError(404));
    } else {
        next();
    }
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(server.port, () => {
    // (async () => {
    //     await setSequelize();
    // })();
    setMongoose();
    console.log(`App listening at http://${server.hostname}:${server.port}`);
});

const setMongoose = () => {
    const mongoose = require('mongoose');
    const config = require('../config/mongoose/config.json');
    mongoose.connect(
        `
            mongodb://${config.development.hostname}:${config.development.port}
        `,
        {
            useNewUrlParser: config.development.useNewUrlParser,
            useUnifiedTopology: config.development.useUnifiedTopology,
            readPreference: config.development.readPreference,
            appname: config.development.appname,
            ssl: config.development.ssl,
            dbName: config.development.database
        }
    );
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log(`Connection to ${config.development.appname} has been established successfully.`);
    });
}

const setSequelize = async () => {
    const config = require('../config/sequelize/config.json');
    const sequelize = require('../config/sequelize/connections/base-connection.js');
    try {
        await sequelize.authenticate();
        console.log(`Connection to '${config.development.database}' has been established successfully.`);
    } catch (error) {
        console.error(`Unable to connect to '${config.development.database}': `, error);
    }

    /** Pass { force: true } to sync function to change database structure. */
    await sequelize.sync();
}

module.exports = app;
