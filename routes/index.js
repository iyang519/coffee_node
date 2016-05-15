var express = require('express');
var router = express.Router();

var loginC = require('./loginController.js');
var indexC = require('./indexController.js');
var coffeeC = require('./coffeeController.js');
var bbsC = require('./bbsController.js');
var moreC = require('./moreController.js');
var beverageC = require('./beverageController.js');
var pictureC = require('./pictureController.js');

// router.get('/?*',function(req,res,next){
//     //设置session用于调试   1：管理 2：学生 3：老师
//     req.session.userId = 3;
//     next();
// })


//登录页跳转
router.get('/', function(req, res, next) {
    res.redirect(301, '/login');
});

//login
router.get('/login',loginC.getLoginPage);
router.get('/register',loginC.getRegisterPage);

router.post('/login',loginC.doLogin);
router.post('/register',loginC.doRegister);

//logout
router.get('/logout',loginC.doLogout);


/* 以下菜单内路由 */
//权限控制
router.get('/index',indexC.checkIsLogin);
//页面渲染
router.get('/index', indexC.getMenuPage);

router.get('/coffee', coffeeC.getMenuPage);
router.get('/bbs',bbsC.getMenuPage);
router.get('/more',moreC.getMenuPage);
router.get('/beverage',beverageC.getMenuPage);
router.get('/picture',pictureC.getMenuPage);

router.post('/picture',pictureC.postPicture);

//bbs提交评论
router.post('/bbs',bbsC.postComment);


module.exports = router;
