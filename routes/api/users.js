const express = require('express');
const router = express.Router();
const User = require('../../models/user')
const auth = require('../../models/authToken')

router.get('/all', auth.authToken, (req, res) => {
    User.getusers(res);
});

router.post('/register', (req, res) => {
    User.register(req, res);
});

router.post('/login', (req, res) => {
    User.login(req, res);
});

router.get('/logout', (req, res) => {
    User.logout(req, res);
})

module.exports = router;