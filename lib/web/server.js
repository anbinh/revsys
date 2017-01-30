'use strict';

const express = require('express');
var config = require('./app/config/database');
var path = require('path');
var pool = require('mysql').createPool(config.connection);
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan = require('morgan');// log request to console


// Config passport
require('./app/config/passport')(passport,pool); // pass passport for configuration


// PORT
const PORT = process.env.PORT || 8080;;

// App
const app = express();

app.use(morgan('dev')); // log every request to the console

// set redering engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './app/views'));

// set "public" directory for static assets
app.use(express.static('public'));

app.set('trust proxy', 1) // trust first proxy

// support json and encoded content
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(session({
    secret: '676342@#@&^&SHJHDJSH@*&*((@)(',
    resave: false,
    saveUninitialized: true
 } )); // session secret

// init passpord for authentication
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// run the app, init all routes
require("./app/routes")(app, passport,pool);


app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
