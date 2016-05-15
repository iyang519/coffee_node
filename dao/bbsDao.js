var mysql = require('mysql');
var $conf = require('../conf/db.js');

//使用连接池，提升性能
var pool = mysql.createPool($conf.mysql);

module.exports = {
    add: function(user,comment, callback) {
        pool.getConnection(function(err, connection) {
            var sql = 'INSERT INTO bbs (user,comment)' +
                'VALUES ("' +
                user + '","' +
                comment + '")';

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
                        msg: '用户评论' + user + '添加成功'
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
