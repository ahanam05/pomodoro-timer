const express = require("express");
const router = express.Router();

const authRoutes = require('./authRoutes');

router.get('/', (req, res) => {
    res.render('landing');
})
router.use('/', authRoutes);

module.exports = router;