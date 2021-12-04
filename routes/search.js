const express = require('express');
const searchCtrl = require('../controllers/youtube');
const router = express.Router();
const YoutubeModel = require('../models/YoutubeData');
module.exports = router;

router.get('/', searchCtrl.getVideos);

router.get('/data', searchCtrl.getDataFromDB);

// router.get("/data/")
