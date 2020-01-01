const express = require('express');
const router = express.Router();
const User = require('../../models/user')
const auth = require('../../models/authFunctions')


router.get('/logout', (req, res) => {
    User.logout(req, res)
})

router.get('/checkinfo', auth.authTokenUser, (req, res) => {
    User.getEmpdat(req, res)
})

router.get('/addcontact', auth.authTokenUser, (req, res) => {
    res.render('employee/emform.ejs', { title: "Add Emergency Detail" })
})

router.get('/requestleave', auth.authTokenUser, (req, res) => {
    res.render('employee/leave.ejs', { title: "Request Leave" })
})

router.get('/checkleave', auth.authTokenUser, (req, res) => {
    res.render('employee/checkleave.ejs', { title: "Check Leave Status" })
})

router.post('/reqleave', auth.authTokenUser, (req, res) => {
    User.reqLeave(req, res)
})


router.post('/saveEmDet', auth.authTokenUser, (req, res) => {
    User.saveEmDet(req, res)
})

router.get('/adddependant', auth.authTokenUser, (req, res) => {
    res.render('employee/depform.ejs', { title: "Add Dependant Information" })
})

router.post('/saveDepInfo', auth.authTokenUser, (req, res) => {
    User.saveDepInfo(req, res)
})

router.get('/checkleave', auth.authTokenUser, (req, res) => {
    res.render('employee/checkleave.ejs', { title: "Check Leave Status" })
})
module.exports = router;