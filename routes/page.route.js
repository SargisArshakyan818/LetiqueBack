const mongoose = require('mongoose');
var multer  = require('multer');
let path = require('path');

var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.dirname(__dirname)+'/UploadFiles');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now()+'.'+file.originalname.split('.')[1]);
    }
});
var upload = multer({ storage : storage});

module.exports = function(app) {
    let fruit = require('../controllers/Page.controller');
    app.route('/getAll').get(fruit.getAll);
    app.route('/addItems').post(upload.array('file', 12),fruit.addItem);
    app.route('/removeItems').post(fruit.removeItem);
    app.route('/changeItems').post(fruit.changeItems)
};
