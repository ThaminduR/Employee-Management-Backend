const Admin = require("./admin")
const SecM = require('./sm')
const Sup = require('./supervisor')
const User = require('./user')

const database = require('../config/db')

db = new database()

exports.login = async function (req, res) {
    var user_id = req.body.user_id
    if (user_id == "admin") {
        Admin.login(req, res)
    }
    
    //checks for second management users and logs them
    sm_query = "SELECT * FROM admin_user WHERE u_id = ? "

    try {
        results = await db.query(sm_query, [user_id])
        
    } catch (error) {
        console.log(error)
    }
    
    if (results.length > 0) {
        SecM.login(req, res)
    }

    //checks for supervisor users and logs them
    sup_query = "SELECT * FROM supervices WHERE s_id = ?"

    try {
        result1 = await db.query(sup_query, [user_id])
    } catch (error) {
        console.log("Error - Sup query")
    }

    if (result1.length > 0) {
        Sup.login(req, res)
    }

    User.login(req, res)


}