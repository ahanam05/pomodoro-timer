const express = require("express");
const router = express.Router();
const timerController = require("../controllers/timerController");

router.get('/setTimer', timerController.timer_get);

module.exports = router;