exports.checkSess = function (req, res, next) {
    sess = req.Session;
    if(sess.user_id){
        next();
    }else{
        res.redirect
    }
} 