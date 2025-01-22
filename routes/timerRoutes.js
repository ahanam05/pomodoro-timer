const express = require("express");
const router = express.Router();
const timerController = require("../controllers/timerController");
const { requireAuth, checkUser} = require('../middleware/authMiddleware');

//not working with the middleware. without the middleware it's working fine. check. 
router.get('/setTimer', requireAuth, checkUser, timerController.timer_get);

module.exports = router;