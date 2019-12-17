const express = require('express')
const router = express.Router()
const apirouter = require('./api/Routes')
const login = require('../models/login')


router.get('/login', (req, res) => { res.render("login.ejs") })

router.post('/login', (req, res) => { login.login(req,res) })
    

router.use('/api', apirouter)

router.use('/', (req, res) => {
    if (req.cookies["authtoken"]) {
        var user = req.cookies["authtoken"]
        res.render('index.ejs', { title: "Home" })
    } else {
        res.render("login.ejs")
    }
})

module.exports = router;
