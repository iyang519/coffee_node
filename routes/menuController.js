var userDao = require('../dao/userDao.js');

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
    //res.render('coffee');
    userDao.queryById(userId, function(data) {
        res.render('picture', {
            title: '菜单',
            type: data.type,
            name: data.account
        });
    })
}
exports.getUserInfoPage = function(req, res, next) {
    var userId = req.session.userId;

    userDao.queryById(userId, function(data) {
        var nData = userModelParse(data);

        res.render('user_info', {
            title: '个人信息',
            type: data.type,
            name: data.name,
            user_account:data.account,
            user_name: nData.name,
            user_sex: nData.sex,
            user_type: nData.type,
            user_grade: nData.grade,
            user_class: nData.class,
            user_college: nData.college
        });
    })
}
exports.getUserInfoModifyPage = function(req,res,next){
    var userId = req.session.userId;

    userDao.queryById(userId,function(data){
        var nData = userModelParse(data);

        res.render('user_info_modify', {
            title: '个人信息修改',
            type: data.type,
            name: data.name,
            user_account:data.account,
            user_name: data.name,
            user_sex: data.sex,
            user_type: nData.type,
            user_grade: data.grade,
            user_class: data.class,
            user_college: data.college
        });
    })
}
exports.doUserInfoModify = function(req,res,next){
    var userId = req.session.userId;
    var rData = req.body;

    userDao.updateById(userId,rData,function(ret){
        if(ret.code == 1){
            req.flash('flag',1);
            req.flash('msg',ret.msg);
        }else{
            req.flash('flag',0);
            req.flash('msg',ret.msg);
        }
        res.redirect('../tips');
    })
}
exports.getPswModifyPage = function(req,res,next){
    var userId = req.session.userId;

    userDao.queryById(userId, function(data) {
        res.render('user_psw_modify', {
            title: '修改密码',
            type: data.type
        });
    })
}
exports.doPswModify = function(req,res,next){
    var userId = req.session.userId;

    //先拿到原始数据
    userDao.queryById(userId,function(data){

        if(data.password == req.body.oldPsw){
            var rData = {
                password : req.body.newPsw
            };
            // var nData = toUserDataModel(rData,data)
            //更新数据
            userDao.updateById(userId,rData,function(ret){
                if(ret.code == 1){
                    req.flash('flag',1);
                    req.flash('msg',ret.msg);
                }else{
                    req.flash('flag',0);
                    req.flash('msg',ret.msg);
                }
                res.redirect('../tips');
            })
        }else{
            req.flash('flag',0);
            req.flash('msg','密码验证失败');
            res.redirect('../tips');
        }
    })
}





