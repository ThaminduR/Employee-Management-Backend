const jwt = require('jsonwebtoken')

exports.authTokenAdmin = function (req, res, next) {
    var token = req.cookies["authtoken"]

    if (token == null) return res.render("login.ejs")

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            res.redirect('/login')
        } else {
            req.user = user
            if (user.user_type == "admin") {
                next()
            }

        }
    })
}

exports.authTokenSM = function (req, res, next) {
    var token = req.cookies["authtoken"]

    if (token == null) return res.render("login.ejs")

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            res.redirect('/login')
        } else {
            req.user = user
            next()
        }
    })
}

exports.authTokenUser = function (req, res, next) {
    var token = req.cookies["authtoken"]

    if (token == null) return res.render("login.ejs")

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            res.redirect('/login')
        } else {
            req.user = user
            next()
        }
    })
}


exports.loggedin = function (req, res, next) {
    var token = req.cookies['authtoken']
    if (token == null) next()
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            next()
        } else {
            if (user.user_type == "admin") {
                res.render("admin/adminHome.ejs", {
                    title: "Admin"
                })
            }
        }
    })
}