const express = require("express");
const router = express.Router();

const timerRoutes = require('./timerRoutes');
const clockRoutes = require('./clockRoutes');
const authRoutes = require('./authRoutes');
const analyticsRoutes = require('./analyticsRoutes');

const {checkUser} = require('../middleware/authMiddleware');

router.get('*', checkUser);
router.get('/', (req, res) => {
    res.render('landing');
})
router.use('/', authRoutes);
router.use('/', clockRoutes);
router.use('/', timerRoutes);
router.use('/', analyticsRoutes);

module.exports = router;