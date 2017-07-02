const express = require('express');
const router = express.Router();
const models = require('../models');

router.post('/index/mygabs/delete/:id', async (request, response) => {
    var gabQuery = { where: { id: request.params.id } };
    var likeQuery = { where: { gabId: request.params.id }, include: [models.users] };
    var deleteLikes = await models.likes.destroy(likeQuery);
    var deleteGab = await models.gabs.destroy(gabQuery);

    response.redirect('/index/mygabs');
});

module.exports = router;