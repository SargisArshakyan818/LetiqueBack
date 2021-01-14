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
    let item = require('../controllers/Page.controller');
    app.route('/getAll').get(item.getAll);
    app.route('/getItemById').post(item.getItemById);
    app.route('/addItems').post(upload.single('file'),item.addItem);
    app.route('/removeItems').post(item.removeItem);
    app.route('/changeItems').post(item.changeItems);
    app.route('/send').post(item.send);
    app.route('/sendUser').post(item.sendUser);
};
