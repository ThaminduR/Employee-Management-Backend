const express = require('express')
const router = express.Router()
const userrouter = require('./usersRoutes')
const adminrouter = require('./adminRoutes')
const smrouter = require('./smRoutes')

router.use('/user', userrouter)
router.use('/sm',smrouter)
router.use('/admin', adminrouter)

module.exports = router