const express = require('express')
const router = express.Router()
const apirouter = require('./api/Routes')
const login = require('../models/login')
const auth = require('../models/authFunctions')
const User = require('../models/user')

router.get('/login', auth.loggedin, (req, res) => { res.render("login.ejs") })

router.post('/login', auth.loggedin, (req, res) => { login.login(req, res) })

router.use('/api', apirouter)

router.use('/', auth.loggedin, (req, res) => {
    res.render("login.ejs")
})


module.exports = router;
