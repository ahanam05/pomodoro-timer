const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.login_get)

router.get('/signup', authController.signup_get)

module.exports = router;