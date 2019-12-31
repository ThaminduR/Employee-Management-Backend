const express = require('express');
const router = express.Router();
const auth = require('../../models/authFunctions')
const Admin = require('../../models/admin')
const User = require('../../models/user')
const SecM = require('../../models/sm')

router.get('/allNEmp', auth.authTokenAdmin, (req, res) => {
    SecM.getNEmp(res)
})

router.get('/allSups', auth.authTokenAdmin, (req, res) => {
    SecM.getsupervisors(res)
})

router.get('/allSMs', auth.authTokenAdmin, (req, res) => {
    Admin.getSM(res)
})

//view of register the second management users
router.get('/registerSM', auth.authTokenAdmin, (req, res) => {
    res.render("admin/register", { title: "Register Second Management User" })
})

//register the second management users
router.post('/registerSM', auth.authTokenAdmin, (req, res) => {
    Admin.registerSM(req, res)
})

router.post('/removeSM', auth.authTokenAdmin, (req, res) => {
    Admin.removeSM(req, res)
})

router.post('/removeEM', auth.authTokenAdmin, (req, res) => {
    SecM.removeEM(req, res)
})

router.get('/reports', auth.authTokenAdmin, (req, res) => {
    res.render('admin/reports', { title: "Reports" })
})

router.get('/userDept', auth.authTokenAdmin, (req, res) => {
    Admin.user_dept(res)
})

module.exports = router
