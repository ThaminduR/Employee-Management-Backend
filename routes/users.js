const express = require('express');
const router = express.Router();
const User = require('../models/user')


router.get('/all', (req, res) => {
    User.getusers(res);
});

router.post('/register', (req, res) => {
    User.register(req, res);
});

router.post('/login', (req, res) => {
    User.login(req, res);
});


module.exports = router;