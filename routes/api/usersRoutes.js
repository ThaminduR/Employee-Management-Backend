const express = require('express');
const router = express.Router();
const User = require('../../models/user')
const auth = require('../../models/authFunctions')

router.use('/register', (req, res) => {
    res.render('register.ejs')
})

router.get('/logout', (req, res) => {
    User.logout(req, res)
})

module.exports = router;

// Started coding the project @MithunW