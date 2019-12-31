const database = require('../config/db')

const jwt = require('jsonwebtoken')

db = new database()

exports.getEmp = async function (res) {
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

exports.addEtoS = async function (req, res) {
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

exports.getReqLeaves = async function (req, res) {
    user_id = req.body.user_id;
    query = 'SELECT * FROM taken WHERE e_id=(SELECT e_id FROM employee NATURAL JOIN supervices WHERE s_id=?) '
    try {
        result = await db.query(query, [user_id]);
        res.render

    } catch (error) { }
}
