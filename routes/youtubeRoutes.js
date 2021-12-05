const express = require('express');
const youtubeController = require('../controllers/youtubeController');
const router = express.Router();
module.exports = router;

// GET API to fetch youtube data API v3 data and saves it in DB
router.get('/', youtubeController.getVideos);

// GET method to retured all the stored data from DB in descending order
router.get('/data', youtubeController.getDataFromDB);

// GET method to search the data from DB
router.get('/search/:name', youtubeController.searchFromDB);
