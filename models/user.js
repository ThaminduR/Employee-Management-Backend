const database = require('../config/db')
const jwt = require('jsonwebtoken')

db = new database()

exports.login = async function(req, res) {
    user_id = req.
    body.user_id
    password = req.body.password
    query = 'SELECT * FROM login_details WHERE user_id = ?'

    try {
        results = await db.query(query, [user_id])
    } catch (err) {
        res.send({
            "code": 400,
            "failed": "error ocurred"
        })
        return
    }
    if (results.length > 0) {

        if (results[0].h_password == password) {

            user = {
                user_id: user_id,
                user_type: "nm"
            }
            const accessToken = jwt.sign(user, process.env.SECRET)
            res.cookie("authtoken", accessToken)
            res.render('employee/home.ejs', { title: "Employee Home" })
            return
        } else {
            res.send({
                "code": 204,
                "failure": "Invalid Credentials !"
            });
            return
        }
    } else {
        res.send({
            "code": 204,
            "failure": "Invalid ID !"
        })
    }
}

exports.logout = function(req, res) {
    res.cookie('authtoken', { maxAge: Date.now() })
    res.redirect('/login')
}

//function to print employee data

exports.getEmpdat = async function(req, res) {
    query = "SELECT * FROM employee_details WHERE id=?"
    id = req.user.user_id
    try {
        result = await db.query(query, [id])
        res.render('employee/info.ejs', {
            title: "Employee Details",
            user: result
        })
    } catch (error) {
        console.log(error)
    }
}


//to save emergency details
exports.saveEmDet = async function(req, res) {
    fullname = req.body.fullname
    contactnum = req.body.contactnum
    id = req.user.user_id

    query = "INSERT INTO emergency_details VALUES (?,?,?)"

    try {
        await db.query(query, [id, fullname, contactnum])
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}

//request a leave
exports.reqLeave = async function(req, res) {
    type = req.body.leavetype
    detail = req.body.detail
    date = req.body.leavedate
    id = req.user.user_id

    query = "INSERT INTO requested VALUES (?,?,?,?)"

    try {
        await db.query(query, [id, type, detail, date])
        res.redirect('/')
            //console.log("Test")
    } catch (error) {
        console.log(error)
    }
}



exports.saveDepInfo = async function(req, res) {
    fullname = req.body.fullname
    birthday = req.body.birthday
    relationship = req.body.relationship
    contactnum = req.body.contactnum
    id = req.user.user_id

    query = "INSERT INTO dependent_info VALUES (?,?,?,?,?)"

    try {
        await db.query(query, [id, fullname, birthday, relationship, contactnum])
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}