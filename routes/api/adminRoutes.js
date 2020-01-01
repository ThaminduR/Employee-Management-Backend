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

//routes to add custom fields
router.get('/addfields', auth.authTokenAdmin, (req, res) => {
    res.render("admin/addfields", { title: "Add Custom Fields" })
})

router.post('/addcustom', auth.authTokenAdmin, (req, res) => {
    Admin.addcustom(req, res)
})

router.get('/reports', auth.authTokenAdmin, (req, res) => {
    res.render('admin/reports', { title: "Reports" })
})

router.get('/userDept', auth.authTokenAdmin, (req, res) => {
    SecM.user_dept(res)
})
router.get('/userJob', auth.authTokenAdmin, (req, res) => {
    SecM.user_job(res)
})

router.get('/userPay', auth.authTokenAdmin, (req, res) => {
    SecM.user_pay(res)
})

router.get('/search', auth.authTokenAdmin, (req, res) => {
    res.render('admin/search', { title: "Search Employee" })
})

router.post('/search', auth.authTokenAdmin, (req, res) => {
    Admin.searchId(req, res)
})

router.get('/organization', auth.authTokenAdmin, (req, res) => {
    Admin.getOrg(res)
})
module.exports = router
