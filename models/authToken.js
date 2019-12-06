const jwt = require('jsonwebtoken')

exports.authToken = function (req, res, next) {
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