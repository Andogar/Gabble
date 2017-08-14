const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/index/gabGrab/:id', async (request, response) => {
    if (request.session.isAuthenticated) {
        var gabQuery = { where: { id: request.params.id } };
        var gab = await models.gabs.find(gabQuery);
        var likeQuery = { where: { gabId: request.params.id }, include: [models.users] };
        var likes = await models.likes.findAll(likeQuery);

        var model = {
            gab: gab.dataValues.content,
            currentUser: request.session.user,
            likes: likes
        };
        response.render('gabgrab', model);
    } else {
        response.redirect('/index/login');
    }
});

router.post('/index/gabGrab/:id', async (request, response) => {
    var gabLike = request.params.id;
    var userLike = request.session.userId;

    var likeQuery = { where: { gabId: gabLike, userId: userLike } };
    var allLikes = await models.likes.findAll(likeQuery);

    if (allLikes.length == 0) {
        var like = await models.likes.create({
            gabId: gabLike,
            userId: userLike
        }).then(result => response.redirect('/index'));
    } else {
        response.redirect('/index');
    }
});

module.exports = router;