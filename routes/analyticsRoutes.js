const express = require("express");
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const {requireAuth, checkUser, noCache} = require('../middleware/authMiddleware');

router.get('/analytics', noCache, requireAuth, checkUser, analyticsController.analytics_get);

module.exports = router;