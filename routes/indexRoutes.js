const express = require('express')
const router = express.Router()
const apirouter = require('./api/Routes')
const loginrouter = require('../models/login')


router.use('/login', (req, res) => { loginrouter.login(req, res) })

router.use('/api', apirouter)

router.use('/', (req, res) => {
    if (req.cookies["authtoken"]) {
        var user = req.cookies["authtoken"]
        res.render('home.ejs',{title:"Home"})
    }
})

module.exports = router;
