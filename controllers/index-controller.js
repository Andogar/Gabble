const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', async (request, response) => {
    response.redirect('/index')
});

router.get('/index', async (request, response) => {
    var gabs = await models.gabs.all({ order: [['createdAt', 'DESC']],include: [models.users, models.likes] });
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

module.exports = router;