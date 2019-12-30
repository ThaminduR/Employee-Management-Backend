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

router.get('/checkinfo', (req, res) => {
    User.getEmpdat(res, res)
})

router.get('/addcontact', (req, res) => {
    res.render('employee/emform.ejs', { title: "Add Emergency Detail" })
})
module.exports = router;