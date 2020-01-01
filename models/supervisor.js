const database = require('../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');


db = new database()

exports.getEmp = async function(res) {
    query = "SELECT * FROM employee_details WHERE id NOT IN (SELECT u_id FROM admin_user) AND id NOT IN (SELECT sup_id FROM supervisors) AND id NOT IN (SELECT e_id FROM supervises) ORDER BY id ASC"

    try {
        result = await db.query(query)
        res.render('sup/users.ejs', {
            title: "Users",
            users: result
        })
    } catch (error) {
        console.log(error)
    }
}

exports.addEtoS = async function(req, res) {
    user_id = req.user.user_id
    id = req.body.id

    query = " INSERT INTO supervises VALUES (?,?)"

    try {
        await db.query(query, [user_id, id])
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}

exports.accept = async function(req, res) {

    leave_id = req.body.leave_id
    console.log(leave_id)

    query1 = " UPDATE leaves SET status='ACCEPTED' WHERE leave_id=?"
    query2="DELETE FROM requested WHERE l_id=?;"

    try {
        await db.query(query1, [leave_id])
        await db.query(query2, [leave_id])
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}

exports.login = async function(req, res) {
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
        hash = await bcrypt.compare(password, results[0].h_password)
        if (hash) {

            user = {
                user_id: user_id,
                user_type: "sup"
            }
            const accessToken = jwt.sign(user, process.env.SECRET)
            res.cookie("authtoken", accessToken)
            res.render('sup/home.ejs', { title: "Home" })
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

exports.getReqLeaves = async function(req, res) {

    user_id = req.user.user_id;

    query = 'SELECT e_id,status,leave_id,leavetype,date,description FROM employee_requestedleaves WHERE s_id=?'

    try {
        result = await db.query(query, [user_id]);

        res.render('sup/requests.ejs', {
            title: "Requests",
            requests: result

        })

    } catch (error) {
        console.log(error)
    }
}

//get info of the supervisor
exports.getEmpdat = async function(req, res) {
    query = "SELECT * FROM employee_details WHERE id=?"
    id = req.user.user_id
    try {
        result = await db.query(query, [id])
        res.render('sup/info.ejs', {
            title: "Employee Details",
            user: result
        })
    } catch (error) {
        console.log(error)
    }
}

//to save dependant info
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


exports.decline = async function (req, res) {
    
    leave_id = req.body.leave_id
    console.log(leave_id)

    query1 = " UPDATE leaves SET status='DECLINED' WHERE leave_id=?"
    query2="DELETE FROM requested WHERE l_id=?;"

    try {
        await db.query(query1, [leave_id])
        await db.query(query2, [leave_id])
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}