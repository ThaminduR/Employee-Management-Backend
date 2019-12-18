const database = require('../config/db')
const jwt = require('jsonwebtoken')

db = new database()

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
