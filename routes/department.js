const express = require('express');
const router = express.Router();
const Department = require('../models/department')

router.get('/all',(req,res)=>{
    Department.getDept(res);
});


module.exports = router;