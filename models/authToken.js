const jwt = require('jsonwebtoken')

exports.authToken = function (req, res, next) {
    var token = req.cookies["authtoken"]
    
    if (token == null) return res.sendStatus(401)
    
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            res.sendStatus(403)
            console.log(err)
        } else {
            req.user = user
            next()
        }
    })
} 