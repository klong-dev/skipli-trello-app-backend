var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var boardRouter = require('./routes/board');
var cardRouter = require('./routes/card');
var inviteRouter = require('./routes/invite');
const {verifyToken} = require('./src/middleware/auth.middleware');
const Board = require('./src/models/board.model');

const {connect} = require('./src/utils/db');

var app = express();


// connect db
connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Auth routes - no JWT verification required
app.use('/auth', authRouter);

// Protected routes - require JWT verification
app.use('/boards', verifyToken, boardRouter);
app.use('/boards/:boardId/cards', verifyToken, cardRouter);
app.use('/cards/invites', verifyToken, inviteRouter);
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
    });
});

module.exports = app;
