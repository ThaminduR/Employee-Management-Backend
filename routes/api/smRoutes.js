const express = require('express');
const router = express.Router();
const auth = require('../../models/authFunctions')
const SecM = require('../../models/sm')
const User = require('../../models/user')

router.get('/allNEmp', auth.authTokenSM, (req, res) => {
    SecM.getNEmp(res)

})

//view of register the users
router.get('/registerEM', auth.authTokenSM, (req, res) => {
    res.render("sm/register", { title: "Register Second Management User" })
})

//register the users
router.post('/registerSM', auth.authTokenSM, (req, res) => {
    SecM.registerEM(reeq, res)
})

router.get('/editEM', auth.authTokenSM, (req, res) => {
    SecM.editEMView(req, res)

})

router.post('/editEM', auth.authTokenSM, (req, res) => {
    SecM.editEM(req, res)
})

router.post('/removeEM', auth.authTokenSM, (req, res) => {
    SecM.removeEM(req, res)
})

router.get('/allSups', auth.authTokenSM, (req, res) => {
    SecM.getsupervisors(res)
})

router.get('/addSup', auth.authTokenSM, (req, res) => {
    SecM.viewaddsupervisors(res)
})

router.post('/addSup', auth.authTokenSM, (req, res) => {
    SecM.addsupervisors(req,res)
})

module.exports = router