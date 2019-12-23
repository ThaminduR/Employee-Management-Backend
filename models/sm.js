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

exports.editEM = async function (req, res) {
    user_id = req.body.id

    query = "SELECT * FROM employee WHERE id=?"
    try {
        result = await db.query(query, [user_id])
    } catch{
        console.log("Error occured in EditEM function !")
    }

    //Get First name from db or post data
    if (!req.body.first_name) {
        first_name = result[0].firstname
    } else {
        first_name = req.body.first_name
    }

    //Get last name from db or post data
    if (!req.body.last_name) {
        last_name = result[0].lastname
    } else {
        last_name = req.bodt.last_name
    }

    //Get marital status from db or post data
    if (!req.body.marital_status) {
        marital_status = result[0].marital_status
    } else {
        marital_status = req.body.marital_status
    }

    //Get birthday from db or post data
    if (!req.body.birthday) {
        birthday = reuslt[0].birthday
    } else {
        birthday = req.body.birthday
    }

    //Get address from db or post data
    if (!req.body.address) {
        address = result[0].address
    } else {
        address = req.body.address
    }

    //Get address from db or post data
    if (!req.body.contact_num) {
        contact_num = result[0].contact_num
    } else {
        contact_num = req.body.contact_num
    }

    query = "SELECT * FROM employee WHERE id=?"
    try {
        result = await db.query(query, [user_id])
    } catch{
        console.log("Error occured in EditEM function !")
    }

    if (!req.body.department) {

    } else {

    }
    if (!req.body.job_title) {

    } else {

    }
    if (!req.body.pay_grade) {

    } else {

    }
    if (!req.body.emp_status) {

    } else {

    }

}

exports.editEMView = async function (req, res) {
    user_id = req.query.id
    res.render('sm/editEM.ejs', {
        title: "Edit Employee",
        id: user_id
    })
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
            res.render('sm/Home.ejs', { title: "Second Management Home" })
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