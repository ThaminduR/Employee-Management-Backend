
const database = require('../config/db')
const jwt = require('jsonwebtoken')

db = new database()

exports.getNEmp = async function (res) {
    query = "SELECT * FROM employee WHERE id NOT IN (SELECT u_id FROM admin_user) AND id NOT IN (SELECT s_id FROM supervices) ORDER BY id ASC"

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

exports.logout = function (req, res) {
    res.cookie('authtoken', { maxAge: Date.now() })
    res.redirect('/login')
}
