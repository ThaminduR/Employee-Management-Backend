const express = require('express');
const router = express.Router();
const userrouter = require('./users');
const departmentrouter = require('./department');

router.use('/login', (req, res) => {
    res.render('login.ejs');
});

router.use('/register', (req, res) => {
    res.render('register.ejs');
})
router.use('/user', userrouter);

router.use('/department', departmentrouter);

module.exports = router;
