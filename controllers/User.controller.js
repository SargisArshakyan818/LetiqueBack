// const mongoose = require('mongoose');
let passport = require('passport');
const jwt = require('jsonwebtoken');
// const fs = require('fs');
// let db = mongoose.connection;
// let local = require('passport-local');
const initializePassport = require('../passport');
initializePassport(passport);
exports.login = function (req, res, next) {

    passport.authenticate('local',{ session: false } ,function (err, user, info) {
        if (err || !user) {
            res.status(400).send(info);
        } else {
            // Remove sensitive data before login
            user.password = undefined;
            req.login(user, function (err) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    const token = jwt.sign({ user: user }, 'carRental');
                    res.json(token);
                }
            });
        }
    })(req, res, next);
};
exports.setTrue = function (req, res) {
    res.send(true)
};
exports.requiresLogin = function (req, res, next) {
    if (req.headers.authorization) {
        let token = req.headers.authorization;
        jwt.verify(token, 'carRental', function (err, decoded) {
            if (err || !decoded) {
                return res.status(401).send({
                    message: 'User is not logged in'
                });
            }
            next();
        });
    } else {
        return res.status(401).send({
            message: 'User is not logged in'
        });
    }
};