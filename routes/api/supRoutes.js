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

module.exports = router






































router.get('/allNEmp', auth.authTokenSM, (req, res) => {
    Sup.getNEmp(res)
})