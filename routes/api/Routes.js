const express = require('express')
const router = express.Router()
const userrouter = require('./usersRoutes')
const departmentrouter = require('./departmentRoutes')
const adminrouter = require('./adminRoutes')

router.use('/user', userrouter)
router.use('/department', departmentrouter)
router.use('/admin', adminrouter)
module.exports = router