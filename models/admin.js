const database = require('../config/db')
const jwt = require('jsonwebtoken')
const promise = require('promise')

db = new database()

exports.getusers = async function (res) {
    query = "SELECT * FROM employee ORDER BY id ASC"

    try {
        result = await db.query(query)
        res.render('admin/users.ejs', {
            title: "All Users",
            users: result
        })
    } catch (error) {
        res.redirect('/')
    }
}

exports.getSM = async function (res) {
    query = "SELECT * FROM employee JOIN admin_user WHERE admin_user.u_id=employee.id ORDER BY id ASC"

    try {
        result = await db.query(query)
        res.render('admin/users.ejs', {
            title: 'All Users',
            users: result
        })
    } catch (error) {
        res.redirect('/')
    }
}

exports.registerSM = async function (req, res) {

    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var id = "EMP00001"

    query1 = 'SELECT id FROM employee ORDER BY id DESC LIMIT 1'

    try {
        result = await db.query(query1)
    } catch (error) {
    }

    if (result.length > 0) {
        //check whether this works or not
        str = result[0].id;
        var temp_str = str.slice(3);
        n = parseInt(temp_str) + 1;
        length = n.toString().length;
        temp_id = str.slice(0, -length);
        id = temp_id + n.toString();
    }

    var dept = req.body.department
    query_dept = 'SELECT d_id FROM department WHERE name = ?'
    result_Dept = await db.query(query_dept, [dept])
    D_id = result_Dept[0].d_id

    var j_title = req.body.job_title
    query_j = 'SELECT j_id FROM jobtitle WHERE title = ?'
    result_j = await db.query(query_j, [j_title])
    j_id = result_j[0].j_id

    var pay_grade = req.body.pay_grade
    query_p = 'SELECT pg_id FROM paygrade WHERE paygrade_name = ?'
    result_p = await db.query(query_p, [pay_grade])
    p_id = result_p[0].pg_id

    var emp_status = req.body.emp_status
    query_e = 'SELECT status_id FROM employment_status WHERE type = ? '
    result_e = await db.query(query_e, [emp_status])
    status_id = result_e[0].status_id

    firstname = req.body.first_name
    lastname = req.body.last_name
    marital_status = req.body.marital_status
    birthday = req.body.birthday
    address = req.body.address
    contact_num = req.body.contact_num

    user_ = [id, firstname, lastname, marital_status, birthday, address, contact_num, j_id, p_id, status_id, D_id]
    
    var user = {
        "id": id,
        "firstname": req.body.first_name,
        "lastname": req.body.last_name,
        "marital_status": req.body.marital_status,
        "birthday": req.body.birthday,
        "address": req.body.address,
        "contact_num": req.body.contact_num,
        "j_id": j_id,
        "p_id": p_id,
        "status_id": status_id,
        "D_id": D_id
    }

    proc_query = 'CALL add_employee(?,?,?,?,?,?,?,?,?,?,?)'

    try {
        db.query(proc_query, user_)
    } catch (error) {
        alert("Error : Couldn't add employee")
    }
}

exports.login = async function (req, res) {
    var user_id = req.body.user_id
    var password = req.body.password
    query = 'SELECT * FROM admin_details WHERE id = ?'

    try {
        results = await db.query(query, [user_id])
    } catch (error) {
        res.send({
            "code": 400,
            "failed": "error ocurred"
        })
        return
    }

    if (results.length > 0) {

        if (results[0].h_password == password) {

            var user = {
                user_id: user_id,
                user_type: "admin"
            }
            const accessToken = jwt.sign(user, process.env.SECRET)

            res.cookie("authtoken", accessToken)
            res.render('admin/adminHome.ejs', { title: "Admin Home" })
        }
        else {
            res.send({
                "code": 204,
                "failure": "Invalid Credentials !"
            });
        }
    }
    else {
        res.send({
            "code": 204,
            "failure": "Invalid ID !"
        })
    }
}

exports.logout = function (req, res) {
    res.cookie('authtoken', { maxAge: Date.now() })
    res.redirect('/login')
}