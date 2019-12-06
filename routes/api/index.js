const express = require('express');
const router = express.Router();
const userrouter = require('./users');
const departmentrouter = require('./department');

router.use('/user', userrouter);
router.use('/department', departmentrouter);

module.exports = router;