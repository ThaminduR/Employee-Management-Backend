const Admin = require("./admin")

exports.login = function (req, res) {
    var user_id = req.body.user_id
    if (user_id == "admin") {
        console.log("ef")
        Admin.login(req, res)
    }
}