const express = require('express');
const router = express.Router();
const Admin = require('../../models/admin')
const auth = require('../../models/authFunctions')

router.get('/allUsers', auth.authTokenAdmin, (req, res) => {
    Admin.getusers(res)
})

router.get('/allSMs', auth.authTokenAdmin, (req, res) => {
    Admin.getSM(res)
})

router.get('/registerSM', (req, res) => {
    res.render("admin/register",{title:"Register Second Management User"})
});

//register the second management users
router.post('/registerSM', (req, res) => {
    Admin.registerSM(req, res);
});

module.exports = router
