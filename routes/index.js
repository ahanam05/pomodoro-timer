const express = require("express");
const router = express.Router();

const timerRoutes = require('./timerRoutes');
const clockRoutes = require('./clockRoutes');
const authRoutes = require('./authRoutes');

router.get('/', (req, res) => {
    res.render('landing');
})
router.use('/', authRoutes);
router.use('/', clockRoutes);
router.use('/', timerRoutes);

module.exports = router;