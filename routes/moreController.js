var userDao = require('../dao/userDao.js');
exports.getMenuPage = function(req, res, next) {
    var userId = req.session.userId;
    userDao.queryById(userId, function(data) {
        res.render('more');
    })
}