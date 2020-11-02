var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

const indexRouter = require('./routes/index.js');
const usuariosRouter = require('./routes/usuarios.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors());

//#region Routes
app.use('/', indexRouter);
app.use('/Usuarios', usuariosRouter);
//#endregion

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
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

const server = require('./config/server.json');

app.listen(server.port, () => {
    console.log(`App listening at http://${server.hostname}:${server.port}`);

    const sequelize = require('./config/connections/base/base-connection.js');

    (async () => {
        try {
            await sequelize.authenticate();
            console.log(`Connection to 'db' has been established successfully.`);
        } catch (error) {
            console.error(`Unable to connect to 'db': `, error);
        }
    
        // await sequelize.sync({force: true});
        await sequelize.sync();
    })();
});

module.exports = app;
