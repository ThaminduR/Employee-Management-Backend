const database = require('../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

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
        hash = await bcrypt.compare(password, results[0].h_password)
        if (hash) {

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
    leave_id = "LEV00001"

    query1 = 'SELECT leave_id FROM leaves ORDER BY leave_id DESC LIMIT 1'

    try {
        result = await db.query(query1)
        console.log("Test")
        if (result.length > 0) {
            str = result[0].leave_id;
            temp_str = str.slice(3);
            n = parseInt(temp_str) + 1;
            length = n.toString().length;
            temp_id = str.slice(0, -length);
            leave_id = temp_id + n.toString();
        }
    } catch (error) {
        console.log(error)
    }



    query = "CALL request_leave(?,?,?,?,?)"

    try {
        await db.query(query, [id, leave_id, type, detail, date])
        res.redirect('/')

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

exports.addDet = async function(req, res) {
    query = "SELECT * FROM additional_details"
    try {
        results = await db.query(query)
        res.render('user/additional.ejs', { title: "Add Additional Information", results: results })
    } catch (error) {

    }
}

exports.adddetdb = async function(req, res) {
    const id = req.user.user_id
    for (var key in req.body) {
        const value = req.body[key]
        const query1 = "SELECT * FROM add_det_emp WHERE add_id = ? AND e_id = ?"
        try {
            const results = await db.query(query1, [key, id])
            if (results.length > 0) {
                const query = "UPDATE add_det_emp SET value = ? WHERE add_id =? AND e_id =?"
                await db.query(query, [value, key, id])
                res.redirect('/')
            } else {
                const query = "INSERT INTO add_det_emp VALUES(?,?,?)"
                try {
                    await db.query(query, [key, id, value])
                    res.redirect('/')
                } catch (error) {
                    console.log(error)
                }
            }
        } catch (error) {
            console.log(error)
        }


    }
}

exports.checkLeave = async function(req,res) {
    const id=req.user.user_id
    query = "SELECT count_leaves(?,? ) AS count_leaves" 

    try {
        result1 = await db.query(query,[id,"Annual"])
        result2 = await db.query(query,[id,"Casual"])
        result3 = await db.query(query,[id,"Maternity"])
        result4 = await db.query(query,[id,"No Pay"])
        var results=[result1,result2,result3,result4]
        res.render('employee/checkleave.ejs', {
            title: "Remaining Leaves",
            results=results

        })
    } catch (error) {
        console.log(error)
    }
}

