
const db = require('../config/db')
const jwt = require('jsonwebtoken')

//function to get all the users from database 
exports.getusers = function (res) {
    query = "SELECT * FROM employee ORDER BY id ASC"
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/')
        }
        res.render('users.ejs', {
            title: 'All Users',
            users: result
        })
    })
}

//function to register a user
exports.register = function (req, res) {

    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var id = 1
    db.query('SELECT id FROM employee ORDER BY id DESC LIMIT 1', (error, result) => {
        if (result.length > 0) {
            id = parseInt(result[0].id, 10) + 1;
            console.log(id)
        }
        var users = {
            "id": id,
            "firstname": req.body.first_name,
            "lastname": req.body.last_name,
            "marital_status": req.body.marital_status,
            "birthday": req.body.birthday,
            "address": req.body.address,
            "contact_num": req.body.contact_num
        }
        var check = false

        db.query('INSERT INTO employee SET ?', users, function (error, results) {
            if (error) {
                console.log("error occured", error)

            } else {
                check = true;
                console.log('Added user detials', results)
            }
        })

        db.query('SELECT * FROM employee WHERE firstname = ? and lastname = ?', [first_name, last_name], function (error, results) {
            var user_id = results[0].id

            var login_details = {
                "user_id": user_id,
                "h_password": req.body.password,
                "salt": "salt not set",
                "clearance_level": req.body.clearance_level
            }

            db.query('INSERT INTO login_details SET ?', login_details, function (error, results) {
                if (error) {
                    console.log("error occured", error)
                    res.send({
                        "code": 400,
                        "failed": "error occured"
                    })

                } else {
                    console.log("Login detials added", results)
                    if (check) {
                        // res.send({
                        //     "code": 200,
                        //     "success": "user registered successfully"
                        // });
                        res.render('login.ejs');
                    } else {
                        console.log("adding user details failed");
                    }
                }

            })
        });
    });

}


//login function 
exports.login = function (req, res) {
    var user_id = req.body.user_id
    var password = req.body.password
    db.query('SELECT * FROM login_details WHERE user_id = ?', [user_id], function (error, results) {
        if (error) {
            // console.log("error ocurred",error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            // console.log('The solution is: ', results);
            if (results.length > 0) {
                if (results[0].h_password == password) {
                    var user = {
                        user_id: user_id
                    }
                    const accessToken = jwt.sign(user, process.env.SECRET)
                    res.cookie("authtoken",accessToken);
                    res.render('home.ejs');
                }
                else {
                    res.send({
                        "code": 204,
                        "failure": "Email and password does not match"
                    });
                }
            }
            else {
                res.send({
                    "code": 204,
                    "failure": "Email does not exits"
                })
            }
        }
    })
}

exports.logout = function (req, res) {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err)
        }
        res.redirect('/')
    });
}




//if data insertion not working uncomment the console .logs and check the output 
//TODO: Restrict duplicate emails 