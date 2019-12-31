const express = require('express');
const router = express.Router();
const User = require('../../models/user')
const auth = require('../../models/authFunctions')


router.get('/logout', (req, res) => {
    User.logout(req, res)
})

router.get('/checkinfo', authTokenUser, (req, res) => {
    User.getEmpdat(res, res)
})

router.get('/addcontact', authTokenUser, (req, res) => {
    res.render('employee/emform.ejs', { title: "Add Emergency Detail" })
})


router.post('/saveEmDet', auth.authTokenUser, (req, res) => {
    User.saveEmDet(req, res)
})
module.exports = router;