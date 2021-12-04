const express = require('express');
const searchCtrl = require('../controllers/youtube');
const router = express.Router();
module.exports = router;

router.get('/', searchCtrl.getVideos);
