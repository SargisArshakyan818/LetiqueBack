module.exports = function(app) {
    let user = require('../controllers/User.controller');
    app.route('/login').post(user.login);
    app.route('/islogin').post(user.requiresLogin,user.setTrue);
}
