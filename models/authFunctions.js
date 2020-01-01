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
            if (user.user_type == "sm") {

                next()

            }
        }
    })
}

exports.authTokenSup = function (req, res, next) {
    var token = req.cookies["authtoken"]

    if (token == null) return res.render("login.ejs")

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            res.redirect('/login')
        } else {
            req.user = user
            if (user.user_type == "sup") {
                next()
            }
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
            if (user.user_type == "nm") {
                next()
            }
        }
    })
}


exports.loggedin = function (req, res, next) {
    var token = req.cookies['authtoken']
    if (token == null) {
        next()
    } else {
        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                next()
            } else {
                if (user.user_type == "admin") {
                    res.render("admin/adminHome.ejs", {
                        title: "Admin"
                    })
                }
                if (user.user_type == "sm") {
                    res.render("sm/home", {
                        title: "Second Management User",
                        id:user.user_id
                    })
                }
                if (user.user_type == "sup") {
                    res.render("sup/home", {
                        title: "Supervisor User",
                        id:user.user_id
                    })
                }
                if (user.user_type == "nm") {
                    res.render("employee/home", {
                        title: "User",
                        id:user.user_id
                    })
                }
            }
        })
    }

}