const express = require('express');
const searchRoutes = require('./search');
const router = express.Router();

router.use('/videos', searchRoutes);

module.exports = router;
