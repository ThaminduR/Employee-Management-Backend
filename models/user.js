
const db = require('../config/db');

exports.getusers = function (res) {
    query = "SELECT * FROM `users` ORDER BY user_id ASC";
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        }
        res.render('index.ejs', {
            title: 'All Users',
            users: result
        });
    });
}

exports.register = function (req, res) {

    var first_name = req.body.first_name;
    //var user_id = null;
    var users = {
        "user_id": "",
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "city": req.body.city,
    }
    var check = false;


    db.query('INSERT INTO users SET ?', users, function (error, results, fields) {
        if (error) {
            console.log("error occured", error);

        } else {
            check = true;
            console.log('Added user detials', results);
        }
    });
    db.query('SELECT * FROM users WHERE first_name = ?', [first_name], function (error, results, fields) {
        var user_id = results[0].user_id;

        var login_details = {
            "user_id": user_id,
            "email": req.body.email,
            "password": req.body.password
        }

        db.query('INSERT INTO login_details SET ?', login_details, function (error, results, fields) {
            if (error) {
                console.log("error occured", error);
                res.send({
                    "code": 400,
                    "failed": "error occured"
                })
            } else {
                console.log("Login detials added", results);
                if (check) {
                    res.send({
                        "code": 200,
                        "success": "user registered successfully"
                    });
                } else {
                    console.log("adding user details failed");
                }
            }

        })
    });



}

exports.login = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    db.query('SELECT * FROM login_details WHERE email = ?', [email], function (error, results, fields) {
        if (error) {
            // console.log("error ocurred",error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            // console.log('The solution is: ', results);
            if (results.length > 0) {
                if (results[0].password == password) {
                    res.send({
                        "code": 200,
                        "success": "login sucessfull"
                    });
                }
                else {
                    res.send({
                        "code": 204,
                        "success": "Email and password does not match"
                    });
                }
            }
            else {
                res.send({
                    "code": 204,
                    "success": "Email does not exits"
                });
            }
        }
    });
}