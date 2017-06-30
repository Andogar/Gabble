const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const loginController = require('./controllers/login-controller');
const registerController = require('./controllers/register-controller');

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

application.use('/public', express.static('./public'));

application.get('/', (request, response) => {
    response.redirect('/index')
});

application.get('/index', async (request, response) => {
    if (request.session.isAuthenticated) {
        var gabs = await models.gabs.findAll();
        request.session.gabs = gabs;

        // need to make a model with database information in it as to not overload session
        response.render('index-logged-in', request.session);
    } else {
        response.render('index', request.session);
    }
});

application.get('/index/gab', (request, response) => {
    if (!request.session.isAuthenticated) {
        response.redirect('/index');
    } else {
        response.render('gab');
    }
});

application.post('/index/gab', (request, response) => {
    var gab = request.body.gabText;

    models.gabs.create({
        content: gab,
        userId: request.session.userId
    }).then(result => response.redirect('/index'));
});


application.use(loginController);
application.use(registerController);


application.listen(3000);