const express = require('express');
const router = express.Router();
const auth = require('../../models/authFunctions')
const SecM = require('../../models/sm')
const User = require('../../models/user')

router.get('/allNEmp', auth.authTokenSM, (req, res) => {
    SecM.getNEmp(res)
})

router.get('/editEM', auth.authTokenSM,(req,res)=>{
    user_id = req.body.id 
    res.render('editEM.ejs',{
        title:"Edit Employee",
        id:id
    })
})

router.post('/removeEM', auth.authTokenSM, (req, res) => {
    SecM.removeEM(req, res)
})

router.get('/allSups', auth.authTokenSM, (req, res) => {
    SecM.getsupervisors(res)
})

router.get('/logout', auth.authTokenSM, (req, res) => {
    User.logout(req, res)
})


module.exports = router