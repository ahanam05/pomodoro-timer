const express = require('express');
const router = express.Router();
const clockController = require("../controllers/clockController");
const { requireAuth, checkUser, noCache} = require('../middleware/authMiddleware');

router.get('/clock', noCache, requireAuth, checkUser, clockController.clock_get);

module.exports = router;