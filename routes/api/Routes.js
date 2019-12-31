const express = require('express')
const router = express.Router()
const userrouter = require('./usersRoutes')
const adminrouter = require('./adminRoutes')
const smrouter = require('./smRoutes')
const suprouter = require('./supRoutes')

router.use('/user', userrouter)
router.use('/sm', smrouter)
router.use('/admin', adminrouter)
router.use('/sup', suprouter)

module.exports = router