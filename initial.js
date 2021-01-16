require('./models/user.model');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const bcrypt = require('bcrypt');
const fs = require('fs');


module.exports = function() {
    function getPassword(password) {
        return bcrypt.hashSync(password, 10)
    }

    User.find({}, (err, user) => {
        if (err) return console.log(err);
        if (user.length === 0) {
            let userJson = JSON.parse(fs.readFileSync('user.json'))[0];
            let admin = new User({
                username: userJson.username,
                password: getPassword(userJson.password),
                role: userJson.role,
                name: userJson.name,
                surname: userJson.surname,
            });
            admin.save((err,result) => {
                if (err) return console.log(err);
                console.log(result)
            })
        }
    })
};

//MongoDB Atlas
//Login: Letique2021
//Password: LetiqueDB2021


//Cloudinary
//Email: letique.armenia@gmail.com
//Password: Letique_2021Armenia