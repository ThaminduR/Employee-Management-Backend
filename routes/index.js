const express = require('express');
const router = express.Router();
const userrouter = require('./users');

router.use('/user', userrouter);



module.exports = router;
