const Admin = require("./admin")
const SecM = require('./sm')
const database = require('../config/db')

db = new database()

exports.login = function (req, res) {
    var user_id = req.body.user_id
    if (user_id == "admin") {
        Admin.login(req, res)
    }
    
 
    if (user_id = "sm") {
        SecM.login(req, res)
    }
}