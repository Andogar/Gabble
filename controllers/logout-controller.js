const express = require('express');
const router = express.Router();

router.get('/index/logout', (request, response) => {
    if (request.session.isAuthenticated) {
        request.session.destroy();
        response.redirect('/index');
    } else {
        response.redirect('/index');
    }
});

module.exports = router;