var userDao = require('../dao/userDao.js');
var indexDao = require('../dao/indexDao.js');
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
    // userDao.queryById(userId, function(data) {
    //     res.render('index', {
    //         title: '菜单',
    //         type: data.type,
    //         name: data.account
    //     });
    // })
    indexDao.queryAll(function(ret) {
        //console.log(ret);
        res.render('index',{
            data: ret
        })
    })


}
