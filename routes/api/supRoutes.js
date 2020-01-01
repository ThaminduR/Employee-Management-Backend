const express = require('express');
const router = express.Router();
const auth = require('../../models/authFunctions')
const Sup = require('../../models/supervisor')
const User = require('../../models/user')

router.get('/allNEmp', auth.authTokenSup, (req, res) => {
    Sup.getEmp(res)
})

router.post('/addEtoS', auth.authTokenSup, (req, res) => {
    Sup.addEtoS(req, res)
})

router.post('/accept', auth.authTokenSup, (req, res) => {
    Sup.accept(req, res)
})

router.get('/requested', auth.authTokenSup, (req, res) => {
    Sup.getReqLeaves(req, res)
})

//to add emergency contacts
router.get('/addcontact', auth.authTokenSup, (req, res) => {
    res.render('sup/emform.ejs', { title: "Add Emergency Detail" })
})
router.post('/saveEmDet', auth.authTokenSup, (req, res) => {
        Sup.saveEmDet(req, res)
    })
    //route to check info
router.get('/checkinfo', auth.authTokenSup, (req, res) => {
    Sup.getEmpdat(req, res)
})

//route to add dependant info
router.get('/adddependant', auth.authTokenSup, (req, res) => {
    res.render('sup/depform.ejs', { title: "Add Dependant Information" })
})

router.post('/saveDepInfo', auth.authTokenSup, (req, res) => {
    Sup.saveDepInfo(req, res)
})

router.get('/viewLeaves', auth.authTokenUser, (req, res) => {
    res.render('sup/requests.ejs', { title: "Requested Leaves" })
})

router.post('/decline', auth.authTokenSup, (req, res) => {
    Sup.decline(req, res)
})

//to add additional data
router.post('/additionaldet', auth.authTokenSup, (req, res) => {
    User.adddetdb(req, res)
})
module.exports = router