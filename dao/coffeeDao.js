var mysql = require('mysql');
var $conf = require('../conf/db.js');

//使用连接池，提升性能
var pool = mysql.createPool($conf.mysql);

module.exports = {
    queryAll: function(callback) {
        //从连接池中获取连接
        pool.getConnection(function(err, connection) {
            var sql = 'select * from coffee';
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
    }
   
}
