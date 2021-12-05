const express = require('express');
const youtubeRoutes = require('./youtubeRoutes');
const router = express.Router();

router.use('/videos', youtubeRoutes);

module.exports = router;
