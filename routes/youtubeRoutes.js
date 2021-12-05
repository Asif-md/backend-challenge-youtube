const express = require('express');
const youtubeController = require('../controllers/youtubeController');
const router = express.Router();
module.exports = router;

router.get('/', youtubeController.getVideos);

router.get('/data', youtubeController.getDataFromDB);

router.get('/search/:name', youtubeController.searchFromDB);
