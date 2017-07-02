const express = require('express');
const router = express.Router();
const models = require('../models');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

router.use(bodyParser.urlencoded());
router.use(expressValidator());

router.get('/index/register', (request, response) => {
    response.render('register');
});

router.post('/index/register', async (request, response) => {
    var name = request.body.username;
    var password = request.body.password;
    var passwordConfirm = request.body.passwordConfirm;

    request.checkBody('username', 'Username must be one word and may include numbers.')
        .matches(/[\w]+$/);
    request.checkBody('password', 'Password must by at least 8 characters and contain at least one number or non alpha-numeric character.')
        .matches(/^(?=.{8})(?=.*[^a-zA-Z])/);
    request.checkBody('passwordConfirm', 'Passwords must match.')
        .matches(request.body.password);

    request.session.errors = request.validationErrors();

    if (request.session.errors) {
        response.render('register', request.session);
    } else {
        var register = await models.users.create({
            username: name,
            password: password
        }).then(result => response.redirect('/index'));
    }
});

module.exports = router;