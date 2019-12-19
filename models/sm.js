const database = require('../config/db')
const jwt = require('jsonwebtoken')

db = new database()

exports.getNEmp = async function (res) {
    query = "SELECT * FROM employee WHERE id NOT IN (SELECT u_id FROM admin_user) AND id NOT IN (SELECT s_id FROM supervices) ORDER BY id ASC"

    try {
        result = await db.query(query)
        res.render('common/users.ejs', {
            title: "All Users",
            users: result
        })
    } catch (error) {
        res.redirect('/')
    }
}

exports.removeEM = async function (req, res) {
    user_id = req.body.id
    query = 'CALL remove_em(?)'
    try {
        db.query(query, [user_id])
        res.redirect('/')
    } catch (error) {
        console.log("Error : Couldn't remove employee")
        alert("Error : Couldn't remove employee")
    }
}

exports.getsupervisors = async function (res) {
    query = "SELECT * FROM employee WHERE id IN (SELECT s_id FROM supervices) ORDER BY id ASC"

    try {
        result = await db.query(query)
        res.render('common/supervisors.ejs', {
            title: "All supervisors",
            users: result
        })
    } catch (error) {
        res.redirect('/')
    }
}

exports.login = async function (req, res) {
    user_id = req.body.user_id
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
                user_type: "sm"
            }
            const accessToken = jwt.sign(user, process.env.SECRET)
            res.cookie("authtoken", accessToken)
            res.render('sm/Home.ejs', { title: "Admin Home" })
            return
        }
        else {
            res.send({
                "code": 204,
                "failure": "Invalid Credentials !"
            });
            return
        }
    }
    else {
        res.send({
            "code": 204,
            "failure": "Invalid ID !"
        })
    }
}