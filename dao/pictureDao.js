var mysql = require('mysql');
var $conf = require('../conf/db.js');

//使用连接池，提升性能
var pool = mysql.createPool($conf.mysql);

module.exports = {
    
    queryAll: function(callback) {
        //从连接池中获取连接
        pool.getConnection(function(err, connection) {
            var sql = 'select * from picture';
            connection.query(sql, function(err, result) {
                if(err){
                    callback({
                        code:-1,
                        msg:'数据库操作错误'
                    })
                    return;
                }
                callback(result);

                //释放连接
                connection.release();
            })
        })
    },
    add: function(data, callback) {
        pool.getConnection(function(err, connection) {
            var sql = 'INSERT INTO picture (user,title,info,sign,imageUrl)' +
                'VALUES ("' +
                data.user + '","' +
                data.title + '","' +
                data.info + '","' +
                data.sign + '","' +
                data.imageUrl + '")';

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
    }

    
}
