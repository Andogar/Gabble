const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const pg = require('pg');

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

application.set('port', process.env.PORT || 3000)

application.listen(application.get('port'), function () {
    console.log('app starting on port: ', application.get('port'))
});


// pg.defaults.ssl = true;
// pg.connect(process.env.DATABASE_URL, function(err, client) {
//   if (err) throw err;
//   console.log('Connected to postgres! Getting schemas...');

//   client
//     .query('SELECT * FROM users;')
//     .on('row', function(row) {
//       console.log(JSON.stringify(row));
//     });
// });