const express = require('express');
const router = express.Router();
const models = require('../models');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded());

router.get('/index/login', (request, response) => {
    response.render('login')
});

router.post('/index/login', async (request, response) => {
    var name = request.body.username;
    var password = request.body.password;

    var query = { where: { username: name, password: password } };
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

module.exports = router;