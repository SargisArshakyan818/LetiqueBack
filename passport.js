const mongoose = require('mongoose');
const User = mongoose.model('user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
module.exports = function () {
    // Serialize sessions
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // Deserialize sessions
    passport.deserializeUser(function (id, done) {
        User.findOne({
            _id: id
        }, '-password', function (err, user) {
            done(err, user);
        });
    });
    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        },
        function (username, password, done) {
            User.findOne({
                username: username
            }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Unknown user or invalid password'
                    });
                }
                if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, {
                        message: 'Unknown user or invalid password'
                    });
                } else {
                    return done(null, user);
                }


            });
        }
    ));
};