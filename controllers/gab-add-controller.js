const express = require('express');
const router = express.Router();
const models = require('../models');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');

router.use(expressValidator());
router.use(bodyParser.urlencoded());

router.get('/index/gab-add', (request, response) => {
    if (!request.session.isAuthenticated) {
        response.redirect('/index/login');
    } else {
        response.render('gab-add', request.session);
    }
});

router.post('/index/gab-add', (request, response) => {
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
        response.render('gab-add', model);
    }
});

module.exports = router;