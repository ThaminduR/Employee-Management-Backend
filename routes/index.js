const express = require('express');
const router = express.Router();
const apirouter = require('./api/index');

router.use('/login', (req, res) => {
    res.render('login.ejs');
});

router.use('/register', (req, res) => {
    res.render('register.ejs');
})

router.use('/api', apirouter);


module.exports = router;
