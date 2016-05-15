var userDao = require('../dao/userDao.js');
var coffeeDao = require('../dao/coffeeDao.js');
var EventProxy = require('eventproxy');


exports.checkIsLogin = function(req, res, next) {
    var userId = req.session.userId;
    //console.log("登录状态显示"+userId);
    if (userId) {
        next();
    } else {
        res.redirect(301, '/index');
    }
}
exports.getMenuPage = function(req, res, next) {
    var userId = req.session.userId;
   
    coffeeDao.queryAll(function(ret) {
        console.log(ret);
        res.render('coffee',{
            data: ret
        })
    })

}