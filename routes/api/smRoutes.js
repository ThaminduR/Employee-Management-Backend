const express = require('express');
const router = express.Router();
const auth = require('../../models/authFunctions')
const SecM = require('../../models/sm')
const User = require('../../models/user')


router.post('/removeEM', auth.authTokenSM, (req, res) => {
    SecM.removeEM(req, res)
})

router.get('/allSups', auth.authTokenSM, (req, res) => {
    SecM.getsupervisors(res)
})

router.get('/allNEmp', auth.authTokenSM, (req, res) => {
    SecM.getNEmp(res)
})

router.get('/logout', auth.authTokenSM, (req, res) => {
    User.logout(req, res)
})


module.exports = router