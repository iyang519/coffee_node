var userDao = require('../dao/userDao.js');
var bbsDao = require('../dao/bbsDao.js');

// exports.checkIsLogin = function(req, res, next) {
//     var userId = req.session.userId;
//     //console.log("登录状态显示"+userId);
//     if (userId) {
//         next();
//     } else {
//         res.redirect(301, '/index');
//     }
// }
exports.getTipsPage = function(req,res,next){
    var userId = req.session.userId;

    userDao.queryById(userId,function(data){
        res.render('bbs',{
            title:'提示页',
            type:data.type,
            flag:req.flash('flag'),
            msg:req.flash('msg')
        })
    })
}
exports.getMenuPage = function(req, res, next) {
    var userId = req.session.userId;

    userDao.queryById(userId, function(data) {
        res.render('bbs', {
            title: '菜单',
            type: data.type,
            name: data.account
        });
    })
}
exports.postComment = function(req,res,next){
    var userId = req.session.userId;    
    //userDao.queryById(userId, function(data) {
    var param = {
        user: req.param('user'),
        comment: req.param('comment')
    }
    bbsDao.add(param.user,param.comment,function(ret){
        if (ret.code == 1) {
            //res.message = "请先登录";
            res.json({
                code : 200,
                msg: "发布评论成功"
            })
        } else {
            //res.message = "登录失败"; 
            res.json({
                code : 500,
                msg: "请先登录"
            })
        }
    })
    //})

        
    // if(userId){

    // }else{
    //     res.message = "请先登录";
    // }

}