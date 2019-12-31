const database = require('../config/db')
const jwt = require('jsonwebtoken')


db = new database()



exports.getSM = async function (res) {
    query = "SELECT * FROM employee JOIN admin_user WHERE admin_user.u_id=employee.id ORDER BY id ASC"

    try {
        result = await db.query(query)
        res.render('admin/sm_users.ejs', {
            title: 'All Users',
            users: result
        })
    } catch (error) {
        console.log(error)

    }
}

exports.registerSM = async function (req, res) {

    first_name = req.body.first_name
    last_name = req.body.last_name
    id = "EMP00001"

    query1 = 'SELECT id FROM employee ORDER BY id DESC LIMIT 1'

    try {
        result = await db.query(query1)
    } catch (error) {
        console.log(error)
    }

    if (result.length > 0) {
        //check whether this works or not
        str = result[0].id;
        temp_str = str.slice(3);
        n = parseInt(temp_str) + 1;
        length = n.toString().length;
        temp_id = str.slice(0, -length);
        id = temp_id + n.toString();
    }

    dept = req.body.department
    query_dept = 'SELECT d_id FROM department WHERE name = ?'
    result_Dept = await db.query(query_dept, [dept])
    D_id = result_Dept[0].d_id

    j_title = req.body.job_title
    query_j = 'SELECT j_id FROM jobtitle WHERE title = ?'
    result_j = await db.query(query_j, [j_title])
    j_id = result_j[0].j_id

    pay_grade = req.body.pay_grade
    query_p = 'SELECT p_id FROM paygrade WHERE paygrade_name = ?'
    result_p = await db.query(query_p, [pay_grade])
    p_id = result_p[0].p_id

    emp_status = req.body.emp_status
    query_e = 'SELECT status_id FROM employment_status WHERE type = ? '
    result_e = await db.query(query_e, [emp_status])
    status_id = result_e[0].status_id

    firstname = req.body.first_name
    lastname = req.body.last_name
    marital_status = req.body.marital_status
    birthday = req.body.birthday
    address = req.body.address
    contact_num = req.body.contact_num
    h_password = req.body.password

    user_ = [id, firstname, lastname, marital_status, birthday, address, contact_num, j_id, p_id, status_id, D_id, h_password]

    proc_query = 'CALL add_employee(?,?,?,?,?,?,?,?,?,?,?,?)'
    query = "INSERT INTO admin_user VALUES (?,?)"
    try {
        db.query(proc_query, user_)
        db.query(query, ["admin", id])
        res.redirect('/')
    } catch (error) {
        console.log(error)
        console.log("Error : Couldn't add employee")

    }
}

exports.removeSM = async function (req, res) {
    user_id = req.body.id
    query = 'CALL remove_sm(?)'
    try {
        await db.query(query, [user_id])
        res.redirect('/')
    } catch (error) {
        console.log(error)
        console.log("Error : Couldn't add employee")
    }
}

exports.user_dept = async function (req, res) {
    query = "SELECT GROUP_CONCAT(e_id) FROM employee_department GROUP BY name"

    try {
        result = await db.query(query)
        res.render('/admin/userDept', { data: result })
    } catch (error) {
        console.log(error)
    }
}

exports.login = async function (req, res) {
    user_id = req.body.user_id
    password = req.body.password
    query = 'SELECT * FROM admin_details WHERE id = ?'

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
                user_type: "admin"
            }
            const accessToken = jwt.sign(user, process.env.SECRET)
            res.cookie("authtoken", accessToken)
            //res.render('admin/adminHome.ejs', { title: "Admin Home" })
            res.redirect('/')
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