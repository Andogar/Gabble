const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');

const indexController = require('./controllers/index-controller');
const gabAddController = require('./controllers/gab-add-controller');
const gabGrabController = require('./controllers/gab-grab-controller');
const myGabsController = require('./controllers/mygabs-controller');
const gabDeleteController = require('./controllers/gab-delete-controller');
const loginController = require('./controllers/login-controller');
const registerController = require('./controllers/register-controller');
const logoutController = require('./controllers/logout-controller');

const models = require('./models');

var application = express();

application.engine('mustache', mustache());
application.set('views', './views');
application.set('view engine', 'mustache');

application.use(session({
    secret: 'secretcookiekey',
    resave: false,
    saveUninitialized: true
}));

application.use(bodyParser.urlencoded());
application.use(expressValidator());

application.use(express.static(__dirname + '/public'));

application.use(indexController);
application.use(gabAddController);
application.use(gabGrabController);
application.use(myGabsController);
application.use(gabDeleteController);
application.use(loginController);
application.use(registerController);
application.use(logoutController);

application.listen(3000);