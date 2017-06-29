const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');

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

application.get('/index', (request, response) => {
    if (request.session.isAuthenticated) {
        response.render('index-logged-in', request.session);
    } else {
        response.render('index', request.session);
    }
});

application.get('/gab', (request, response) => {
    if (!request.session.isAuthenticated) {
        response.redirect('/index');
    } else {
        response.render('gab');
    }
});

application.post('/gab', (request, response) => {
    var gab = request.body.gab;


});

application.get('/login', (request, response) => {
    response.render('login')
});

application.post('/login', async (request, response) => {
    var name = request.body.username;
    var password = request.body.password;

    var userList = await models.users.all();
    var query = { where: { username: name, password: password} };
    var user = await models.users.find(query);

    if (user) {
        request.session.user = name;
        request.session.isAuthenticated = true;
        request.session.userId = user.dataValues.id;
        response.redirect('/index');
    } else {
        response.render('login');
    }
});

application.get('/register', (request, response) => {
    response.render('register');
});

application.post('/register', (request, response) => {
    var name = request.body.username;
    var password = request.body.password;
    var passwordConfirm = request.body.passwordConfirm;
    var passREGEX = '/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/';
    var nameREGEX = '/^[a-zA-Z\s]*$/';

    request.checkBody('username', 'Username must be letters and spaces only.')
        .matches(nameREGEX);
    request.checkBody('password', 'Password must by at least 8 characters and contain at least one number or non alpha-numeric character.')
        .matches(passREGEX);
    request.checkBody('passwordConfirm', 'Passwords must match.')
        .matches(request.body.password);

    //todo: check if validation errors come out as an array
    //only print out first item in array if they do so only one error appears

    request.session.errors = request.validationErrors();

    if (request.session.errors) {
        response.render('register', request.session);
    } else {
        models.users.create({
            username: name,
            password: password
        }).then(result => response.redirect('/index'));
    }
});

application.listen(3000);