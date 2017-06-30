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

application.get('/', async (request, response) => {
    response.redirect('/index')
});

application.get('/index', async (request, response) => {
    var gabs = await models.gabs.all({ include: [models.users, models.likes] });
    var model = {
        currentUser: request.session.user,
        gabs: gabs
    };
    if (request.session.isAuthenticated) {
        response.render('index-logged-in', model);
    } else {
        response.render('index', model);
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

    request.checkBody('gabText', 'Gab must be between 1 and 140 characters').notEmpty().len(1, 140);
    var errors = request.validationErrors();


    if (!errors) {
        var gab = request.body.gabText;

        models.gabs.create({
            content: gab,
            userId: request.session.userId
        }).then(result => response.redirect('/index'));
    } else {
        var model = {
            error: errors[0].msg
        }
        response.render('gab', model);
    }

});


application.use(loginController);
application.use(registerController);


application.listen(3000);