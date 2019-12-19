
const database = require('../config/db')
const jwt = require('jsonwebtoken')

db = new database()

exports.login = async function () { }

exports.logout = function (req, res) {
    res.cookie('authtoken', { maxAge: Date.now() })
    res.redirect('/login')
}
