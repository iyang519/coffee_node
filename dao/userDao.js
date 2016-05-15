var mysql = require('mysql');
var $conf = require('../conf/db.js');

//使用连接池，提升性能
var pool = mysql.createPool($conf.mysql);

module.exports = {
    add: function(data, callback) {
        pool.getConnection(function(err, connection) {
            var sql = 'INSERT INTO user (account,password,qq,sign)' +
                'VALUES ("' +
                data.account + '","' +
                data.password + '","' +
                data.qq + '","' +
                data.sign + '")';

            connection.query(sql, function(err, result) {
                if(err){
                    callback({
                        code:-1,
                        msg:'数据库操作错误'
                    })
                    return;
                }

                if (result.affectedRows > 0) {
                    callback({
                        code: 1,
                        msg: '新用户' + data.name + '添加成功'
                    })
                } else {
                    callback({
                        code: 0,
                        msg: '用户添加失败'
                    })
                }

                //释放连接
                connection.release();
            })
        })
    },
    updateById: function(id, data, callback) {
        // acount password name sex class grade college 可以更改
        pool.getConnection(function(err, connection) {
            var fieldArr = [];
            for (var key in data) {
                fieldArr.push(key + '="' + data[key] + '"');
            }
            var sql = 'update user set ' + fieldArr.join(',') + ' where id=' + id;

            // var sql2 = 'update user set account="'+data.account+'",password="'+data.password+'",name="'+data.name+'",sex='+data.sex+',class="'+data.class+'",grade="'+data.grade+'",college="'+data.college+'" where id='+id;
            connection.query(sql, function(err, result) {
                if(err){
                    callback({
                        code:-1,
                        msg:'数据库操作错误'
                    })
                    return;
                }
                if (result.affectedRows > 0) {
                    callback({
                        code: 1,
                        msg: '用户（id:' + id + '） 数据更新成功'
                    })
                } else {
                    callback({
                        code: 0,
                        msg: '用户（id:' + id + '） 数据更新失败'
                    })
                }

                //释放连接
                connection.release();
            })
        })
    },
    queryById: function(id, callback) {
        pool.getConnection(function(err, connection) {
            var sql = 'select * from user where id ="' + id + '"';
            connection.query(sql, function(err, result) {
                if(err){
                    callback({
                        code:-1,
                        msg:'数据库操作错误'
                    })
                    return;
                }
                if (result.length) {
                    callback(result[0]);
                } else {
                    callback({});
                }

                //释放连接
                connection.release();
            })
        })
    },
    queryByKey: function(key,val,callback){
        //从连接池中获取连接
        pool.getConnection(function(err, connection) {
            var sql = 'select * from user where '+ key +' = "' + val + '"';
            connection.query(sql, function(err, result) {
                if(err){
                    callback({
                        code:-1,
                        msg:'数据库操作错误'
                    })
                    return;
                }
                if (result.length) {
                    callback(result[0]);
                } else {
                    callback({});
                }

                //释放连接
                connection.release();
            })
        })
    },
    queryAll: function(callback) {
        //从连接池中获取连接
        pool.getConnection(function(err, connection) {
            var sql = 'select * from user';
            connection.query(sql, function(err, result) {
                if(err){
                    callback({
                        code:-1,
                        msg:'数据库操作错误'
                    })
                    return;
                }
                if (result.length) {
                    callback(result);
                } else {
                    callback(result);
                }

                //释放连接
                connection.release();
            })
        })
    },
    queryAllByKey: function(key,val,callback){
        //从连接池中获取连接
        pool.getConnection(function(err, connection) {
            var sql = 'select * from user where '+ key +' = "' + val + '"';
            connection.query(sql, function(err, result) {
                if(err){
                    callback({
                        code:-1,
                        msg:'数据库操作错误'
                    })
                    return;
                }
                if (result.length) {
                    callback(result);
                } else {
                    callback(result);
                }

                //释放连接
                connection.release();
            })
        })
    },
    deleteById: function(id, callback) {
        pool.getConnection(function(err,connection){
            var sql = 'DELETE FROM user where id='+id
            connection.query(sql,function(err,result){
                if(err){
                    callback({
                        code:-1,
                        msg:'数据库操作错误'
                    })
                    return;
                }
                if (result.affectedRows > 0) {
                    callback({
                        code: 1,
                        msg: '用户' + id + ' 删除成功'
                    })
                } else {
                    callback({
                        code: 0,
                        msg: '用户'+ id +' 删除失败'
                    })
                }

                //释放连接
                connection.release();
            })
        })
    },
    queryIsLogin: function(account, password, callback) {
        //从连接池中获取连接
        pool.getConnection(function(err, connection) {
            var sql = 'select password,id from user where account = "' + account + '"';
            connection.query(sql, function(err, result) {
                if(err){
                    callback({
                        code:-1,
                        msg:'数据库操作错误'
                    })
                    return;
                }
                if (result.length) {
                    var res = result[0];
                    if (res.password == password) {
                        //返回成功和对应的userId
                        callback(1, res.id);
                    } else {
                        callback(0);
                    }
                } else {
                    callback(-1);
                }

                //释放连接
                connection.release();
            })
        })
    }
}
