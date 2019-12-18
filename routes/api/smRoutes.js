const express = require('express');
const router = express.Router();
const auth = require('../../models/authFunctions')
const SM = require('../../models/sm')
const User = require('../../models/user')


router.post('/removeEM', auth.authTokenSM, (req, res) => {
    SecM.removeEM(req, res)
})