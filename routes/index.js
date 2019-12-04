const express = require('express');
const router = express.Router();
const userrouter = require('./users');


router.use('/login', (req,res) => {
    res.render('login.ejs');
});

router.use('/register', (req,res) => {
    res.render('register.ejs');
})
router.use('/user', userrouter);


module.exports = router;
