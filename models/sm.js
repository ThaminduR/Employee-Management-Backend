const database = require('../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

db = new database()

exports.getNEmp = async function (res) {
    query = "SELECT * FROM employee_details WHERE id NOT IN (SELECT u_id FROM admin_user) AND id NOT IN (SELECT s_id FROM supervises) ORDER BY id ASC"

    try {
        result = await db.query(query)
        res.render('common/users.ejs', {
            title: "All Users",
            users: result
        })
    } catch (error) {
        console.log(error)
    }
}



exports.editEM = async function (req, res) {
    user_id = req.body.id

    query = "SELECT * FROM employee WHERE id=?"
    try {
        result = await db.query(query, [user_id])
    } catch (error) {
        console.log(error)
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
        last_name = req.body.last_name
    }

    //Get marital status from db or post data
    if (!req.body.marital_status) {
        marital_status = result[0].marital_status
    } else {
        marital_status = req.body.marital_status
    }

    //Get birthday from db or post data
    if (!req.body.birthday) {
        birthday = result[0].birthday
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

    //Get department from db
    query = "SELECT * FROM works WHERE e_id=?"
    try {
        result_d = await db.query(query, [user_id])
    } catch (error) {
        console.log(error)
        console.log("Error occured in EditEM function !")
    }

    query2 = "SELECT * FROM department WHERE name=?"
    try {
        result_d = await db.query(query, [user_id])
        dept_id = await db.query(query2, [req.body.department])
    } catch (error) {
        console.log(error)
        console.log("Error occured in EditEM function !")
    }

    //set department
    if (!req.body.department) {
        d_id = result_d[0].d_id
    } else {
        d_id = dept_id[0].d_id
    }

    //Get department from db
    query = "SELECT * FROM employee_job WHERE e_id=?"
    try {
        result_j = await db.query(query, [user_id])
    } catch (error) {
        console.log(error)
        console.log("Error occured in EditEM function !")
    }

    query2 = "SELECT * FROM jobtitle WHERE title=?"
    try {
        result_d = await db.query(query, [user_id])
        job_id = await db.query(query2, [req.body.job_title])
    } catch (error) {
        console.log(error)
        console.log("Error occured in EditEM function !")
    }

    //set jobtitle
    if (!req.body.job_title) {
        j_id = result_j[0].j_id
    } else {
        j_id = job_id[0].j_id
    }

    //get paygrade from db
    query = "SELECT * FROM employee_pay WHERE e_id=?"
    try {
        result_p = await db.query(query, [user_id])
    } catch (error) {
        console.log(error)
        console.log("Error occured in EditEM function !")
    }

    query2 = "SELECT * FROM paygrade WHERE paygrade_name=?"
    try {
        result_d = await db.query(query, [user_id])
        pay_id = await db.query(query2, [req.body.pay_grade])
    } catch (error) {
        console.log(error)
        console.log("Error occured in EditEM function !")
    }

    //set paygrade
    if (!req.body.pay_grade) {
        p_id = result_p[0].p_id
    } else {
        p_id = pay_id[0].p_id
    }

    //get emp status from db 
    query = "SELECT * FROM employee_empstatus WHERE e_id=?"
    try {
        result_s = await db.query(query, [user_id])
    } catch (error) {
        console.log(error)
        console.log("Error occured in EditEM function !")
    }

    query2 = "SELECT * FROM employment_status WHERE type=?"
    try {
        result_d = await db.query(query, [user_id])
        temp_status_id = await db.query(query2, [req.body.emp_status])
    } catch (error) {
        console.log(error)
        console.log("Error occured in EditEM function !")
    }

    //set emp status
    if (!req.body.emp_status) {
        status_id = result_s[0].status_id
    } else {
        status_id = temp_status_id[0].status_id
    }

    final_query = "CALL edit_employee(?,?,?,?,?,?,?,?,?,?,?)"
    user_ = [user_id, first_name, last_name, marital_status, birthday, address, contact_num, j_id, p_id, status_id, d_id]
    try {
        db.query(final_query, user_)
    } catch (error) {
        console.log(error)
        console.log("Can't edit employee")
    }
    res.redirect('./')
}

exports.registerEM = async function (req, res) {

    first_name = req.body.first_name
    last_name = req.body.last_name
    id = "EMP00001"

    query1 = 'SELECT id FROM employee ORDER BY id DESC LIMIT 1'

    try {
        result = await db.query(query1)
    } catch (error) { console.log(error) }

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
    try {
        result_Dept = await db.query(query_dept, [dept])
    } catch (error) {
        console.log(error)
    }
    D_id = result_Dept[0].d_id


    j_title = req.body.job_title
    query_j = 'SELECT j_id FROM jobtitle WHERE title = ?'
    try {
        result_j = await db.query(query_j, [j_title])
    } catch (error) {
        console.log(error)
    }
    j_id = result_j[0].j_id


    pay_grade = req.body.pay_grade
    query_p = 'SELECT p_id FROM paygrade WHERE paygrade_name = ?'
    try {
        result_p = await db.query(query_p, [pay_grade])
    } catch (error) {
        console.log(error)
    }
    p_id = result_p[0].p_id

    emp_status = req.body.emp_status
    query_e = 'SELECT status_id FROM employment_status WHERE type = ? '
    try {
        result_e = await db.query(query_e, [emp_status])
    } catch (error) {
        console.log(error)
    }
    status_id = result_e[0].status_id

    firstname = req.body.first_name
    lastname = req.body.last_name
    marital_status = req.body.marital_status
    birthday = req.body.birthday
    address = req.body.address
    contact_num = req.body.contact_num
    password = req.body.password
    h_password = bcrypt.hashSync(password, 10);

    user_ = [id, firstname, lastname, marital_status, birthday, address, contact_num, j_id, p_id, status_id, D_id, h_password]

    proc_query = 'CALL add_employee(?,?,?,?,?,?,?,?,?,?,?,?)'

    try {
        db.query(proc_query, user_)
        res.redirect('/')
    } catch (error) {
        console.log(error)
        console.log("Error : Couldn't add employee")

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
        console.log(error)
        console.log("Error : Couldn't remove employee")
    }
}



exports.getsupervisors = async function (res) {
    query = "SELECT * FROM employee WHERE id IN (SELECT sup_id FROM supervisors) ORDER BY id ASC"

    try {
        result = await db.query(query)
        res.render('common/supervisors.ejs', {
            title: "All supervisors",
            users: result
        })
    } catch (error) {
        console.log(error)
    }
}

exports.viewaddsupervisors = async function (res) {
    query = "SELECT e_id FROM employee_job WHERE j_id = 1 AND e_id NOT IN (SELECT sup_id FROM supervisors) AND e_id NOT IN (SELECT u_id FROM admin_user)"

    try {
        result = await db.query(query)
        res.render('sm/addsup.ejs', {
            title: "Add Supervisor",
            sups: result
        })
    } catch (error) {
        console.log(error)
    }
}

exports.addsupervisors = async function (req, res) {
    sup_id = req.body.id
    user_id = req.user.user_id
    query = "INSERT INTO supervisors VALUES (?,?)"

    try {
        await db.query(query, [user_id, sup_id])
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}

exports.removeSup = async function (req, res) {
    user_id = req.body.id
    query = 'DELETE FROM supervisors WHERE sup_id = ?'
    try {

        db.query(query, [user_id])
        res.redirect('/')
    } catch (error) {
        console.log(error)
        console.log("Error : Couldn't remove supervisor")
    }
}


exports.user_dept = async function (res) {
    query = "SELECT name as Department, GROUP_CONCAT(e_id) as Employees, count(e_id) as Count FROM employee_department GROUP BY name"

    try {
        result = await db.query(query)
        res.render('report/userDept', { departments: result })
    } catch (error) {
        console.log(error)
    }
}

exports.user_job = async function (res) {
    query = 'SELECT title as Job, GROUP_CONCAT(e_id) as Employees, count(e_id) as Count FROM employee_jobtitle GROUP BY title'

    try {
        result = await db.query(query)
        res.render('report/userJob', { jobs: result })
    } catch (error) {
        console.log(error)
    }
}

exports.user_pay = async function (res) {
    query = 'SELECT paygrade_name as Pay_Grade , GROUP_CONCAT(e_id) as Employees, count(e_id) as Count FROM employee_paygrade GROUP BY paygrade_name'

    try {
        result = await db.query(query)
        res.render('report/userPay', { PayGs: result })
    } catch (error) {
        console.log(error)
    }
}

exports.searchId = async function (req, res) {
    query = "SELECT * FROM employee_details WHERE id = ?"
    id = req.body.id
    try {
        result = await db.query(query, [id])
        res.send(result[0])
    } catch (error) {
        console.log(error)
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
        hash = await bcrypt.compare(password, results[0].h_password)
        if (hash) {
            user = {
                user_id: user_id,
                user_type: "sm"
            }
            const accessToken = jwt.sign(user, process.env.SECRET)
            res.cookie("authtoken", accessToken)
            res.render('sm/home.ejs', { title: "Second Management Home" })
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


//get department info
exports.getDept = function (res) {
    query = "SELECT * FROM department ORDER BY d_id ASC";
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        }
        res.render('department.ejs', {
            title: 'All Departments',
            departments: result
        });
    });
}

exports.saveEmDet = async function (req, res) {
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

//to save dependant info
exports.saveDepInfo = async function (req, res) {
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
//to get second management user info
exports.getEmpdat = async function (req, res) {
    query = "SELECT * FROM employee_details WHERE id=?"
    id = req.user.user_id
    try {
        result = await db.query(query, [id])
        res.render('sm/info.ejs', {
            title: "Employee Details",
            user: result
        })
    } catch (error) {
        console.log(error)
    }
}

exports.addDet = async function(req, res) {
    query = "SELECT * FROM additional_details"
    try {
        results = await db.query(query)
        res.render('sm/additional.ejs', { title: "Add Additional Information", results: results })
    } catch (error) {

    }
}