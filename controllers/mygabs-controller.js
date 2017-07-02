const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/index/mygabs', async (request, response) => {
    if (request.session.isAuthenticated) {
        var gabQuery = { where: { userId: request.session.userId }, include: [models.users, models.likes] };
        var gabs = await models.gabs.findAll(gabQuery);

        var model = {
            currentUser: request.session.user,
            gabs: gabs
        };
        response.render('mygabs', model);
    } else {
        response.redirect('/index');
    }
});

module.exports = router;