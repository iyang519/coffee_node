var userDao = require('../dao/userDao.js');

exports.getLoginPage = function(req,res,next){
    res.render('login');
}
exports.getRegisterPage = function(req,res,next){
    res.render('register');
}

exports.doLogin = function(req,res,next){
    var param = {
        account: req.param('account'),
        password: req.param('password')
    }
    console.log(req.param);
    userDao.queryIsLogin(param.account, param.password, function(code,userId) {
        switch (code) {
            case 1:
            //在session中保存登录态
                req.session.userId = userId;
                req.session.username = param.username;
                res.json({
                    code: '200',
                    msg: '登录成功',
                    username :param.account
                })
                break;
            case 0:
                res.json({
                    code: '500',
                    msg: '密码错误，登录失败'
                })
                break;
            case -1:
                res.json({
                    code: '500',
                    msg: '错误，账号不存在'
                })
                break;
            default:
                res.json({
                    code: '500',
                    msg: '系统错误'
                })
        }
    })
}

exports.doRegister = function(req,res,next) {
    var param = {
        account: req.param('account'),
        password: req.param('password'),
        qq: req.param('qq'),
        sign: req.param('sign')
    }
    userDao.add(param, function(code,userId) {
        switch (code) {
            case 1:
            //在session中保存登录态
                req.session.userId = userId;
                req.session.username = param.username;
                res.json({
                    code: '200',
                    msg: '注册成功',
                    username :param.account
                })
                break;
            case -1:
                res.json({
                    code: '500',
                    msg: '数据库操作错误'
                })
                break;
            default:
                res.json({
                    code: '200',
                    msg: '注册成功'
                })
        }
    })

    // body...
} 

exports.doLogout = function(req,res,next){
    //清除session的信息
    req.session.userId = '';

    res.redirect(301,'/');
}

