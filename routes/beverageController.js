var userDao = require('../dao/userDao.js');
var beverageDao = require('../dao/beverageDao.js');
var EventProxy = require('eventproxy');

exports.checkIsLogin = function(req, res, next) {
    var userId = req.session.userId;
    if (userId) {
        next();
    } else {
        res.redirect(301, '/index');
    }
}
exports.getMenuPage = function(req, res, next) {
    var userId = req.session.userId;
    beverageDao.queryAll(function(ret) {
        console.log(ret);
        res.render('beverage',{
            data: ret
        })
    })
}
