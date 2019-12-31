const database = require('../config/db')

const jwt = require('jsonwebtoken')

db = new database()

exports.getReqLeaves = async function (req, res) {
    user_id = req.body.user_id;
    query = 'SELECT * FROM taken WHERE e_id=(SELECT e_id FROM employee NATURAL JOIN supervices WHERE s_id=?) '
    try {
        result = await db.query(query, [user_id]);

    } catch (error) {
        res.redirect('/')
    }

}

