const express = require('express');
const router = express.Router();
const clockController = require("../controllers/clockController");
const { requireAuth, checkUser} = require('../middleware/authMiddleware');

//not working with the middleware, check!
router.get('/clock', requireAuth, checkUser, clockController.clock_get);

module.exports = router;