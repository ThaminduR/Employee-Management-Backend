const express = require('express')
const router = express.Router()
const apirouter = require('./api/Routes')
const login = require('../models/login')
const auth = require('../models/authFunctions')

router.get('/login', auth.loggedin, (req, res) => { res.render("login.ejs") })

router.get('/test',(req, res) => {
    // bcrypt = require('bcryptjs')
    // console.log(bcrypt.hashSync('1234', 10))
    console.log("For testing purposes only")
})

router.post('/login', auth.loggedin, (req, res) => { login.login(req, res) })

router.use('/api', apirouter)

router.use('/', auth.loggedin, (req, res) => {
    res.render("login.ejs")
})



module.exports = router;
