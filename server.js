const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');

const indexController = require('./controllers/index-controller');
const gabAddController = require('./controllers/gab-add-controller');
const gabGrabController = require('./controllers/gab-grab-controller');
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

// todo: create a "My Gabs" page where you can delete and edit your gabs.
// route: index/gabs/mygabs

application.get('/index/mygabs', async (request, response) => {
    var gabQuery = { where: { userId: request.session.userId }, include: [models.users, models.likes] };
    var gabs = await models.gabs.findAll(gabQuery);

    var model = {
        currentUser: request.session.user,
        gabs: gabs
    };

    response.render('mygabs', model);
});

application.use(indexController);
application.use(gabAddController);
application.use(gabGrabController);
application.use(loginController);
application.use(registerController);
application.use(logoutController);

application.listen(3000);