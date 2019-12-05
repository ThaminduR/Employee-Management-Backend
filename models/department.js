
const db = require('../config/db');

exports.getDept = function (res) {
    query = "SELECT * FROM department ORDER BY d_id ASC";
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        }
        res.render('department.ejs', {
            title: 'All Departments',
            department: result
        });
    });
}