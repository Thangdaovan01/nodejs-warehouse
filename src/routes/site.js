const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController')


router.post('/search', siteController.search);

// router.get('/search', siteController.search);
// router.get('/:page', siteController.home);


router.get('/', siteController.home);

module.exports = router;