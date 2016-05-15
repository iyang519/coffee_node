var userDao = require('../dao/userDao.js');
var pictureDao = require('../dao/pictureDao.js');
var EventProxy = require('eventproxy');
var path=require('path');


//新增代码
var express = require("express");  
var bodyParser =  require("body-parser");  
var app    =   express();  

// app.use(express.bodyParser({
//     uploadDir: __dirname + '/upload/',
//     keepExtensions: true,
//     limit: 10000000
// }));

// app.use(express.multipart());
// app.use(express.methodOverride());

//上传图片
var formidable = require('formidable');
var fs = require('fs');
var AVATAR_UPLOAD_FOLDER = '/imgs/picture/';

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
    
    userDao.queryById(userId, function(data) {
        var username = data.account;
        pictureDao.queryAll(function(ret) {
            ret.username = username;
            res.render('picture',{
                data: ret
            })
        });
    })
}
// exports.postPicture = function(req,res,next){
   
// }
exports.postPicture = function(req, res,next) {    
    if (req.url == '/picture' && req.method.toLowerCase() == 'post') {  
        // parse a file upload  
        var params;
        var form = new formidable.IncomingForm(); 
        form.encoding = 'utf-8'; 

        //form.uploadDir = path.join(__dirname, 'tmp');   //设置上传文件存放的文件夹，默认为系统的临时文件夹，可以使用fs.rename()来改变上传文件的存放位置和文件名
        form.keepExtensions = true;
        //这里formidable会对upload的对象进行解析和处理  
        form.parse(req, function(err, fields, files) { 
            var filePath;
            for(var key in files){
                if( files[key].path ){
                    filePath = files[key].path;
                    break;
                }
            }
            console.log(fields);
            params = fields;
            //console.log("文件路径"+filePath);
            //文件移动的目录文件夹，不存在时创建目标文件夹
            var targetDir = path.join('/Users/renyang/Documents/study/graduation_project/public/imgs', 'upload');
            var fileExt = filePath.substring(filePath.lastIndexOf('.'));

            //console.log(targetDir);
            if (!fs.existsSync(targetDir)) {
                fs.mkdir(targetDir);
            }
            //判断文件类型是否允许上传
            if (('.jpg.jpeg.png.gif').indexOf(fileExt.toLowerCase()) === -1) {
                var err = new Error('此文件类型不允许上传');
                res.json({code:-1, message:'此文件类型不允许上传'});
            } else {
                
                //以当前时间戳对上传文件进行重命名
                var fileName = new Date().getTime() + fileExt;
                var targetFile = path.join(targetDir, fileName);
                //移动文件
                fs.rename(filePath, targetFile, function (err) {
                    if (err) {
                        console.info(err);
                        res.json({code:-1, message:'操作失败'});
                    } else {
                        //上传成功，返回文件的相对路径
                        var fileUrl = 'http://localhost:3000/imgs/upload/' + fileName;
                        console.log(fileUrl);
                        params['imageUrl'] = fileUrl;
                        //console.log(params);
                        pictureDao.add(params,function(code){
                            switch (code) {
                                case 1:
                                //在session中保存登录态
                                    req.session.userId = userId;
                                    req.session.username = param.username;
                                    res.json({
                                        code: '200',
                                        msg: '上传成功',
                                        username :param.account
                                    })
                                    //res.redirect(301, '/picture');
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


                        //res.json({code:0, fileUrl:fileUrl});
                    }
                });

                

                process.nextTick(function(){
                    fs.unlink(filePath, function(err) {
                        if (err) {
                            console.info("删除上传时生成的临时文件失败");
                        } else {
                            console.info("删除上传时生成的临时文件");
                        }
                    });
                });
            }
             
        });  
        return;  
    }  
  
   
}

