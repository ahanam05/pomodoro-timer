const express = require("express");
const router = express.Router();
const timerController = require("../controllers/timerController");
const { requireAuth, checkUser, noCache} = require('../middleware/authMiddleware');

router.get('/setTimer', noCache, requireAuth, checkUser, timerController.timer_get);

module.exports = router;