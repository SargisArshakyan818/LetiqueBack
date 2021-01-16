const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer  = require('multer');
let path = require('path');
cloudinary.config({
    cloud_name: 'dm5jn4y7u',
    api_key: '548577767947862',
    api_secret: '6vaJ5AUCXQaChvxY7_ZoYY4LoKo',
});
// const storage =   multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, path.dirname(__dirname)+'/UploadFiles');
//     },
//     filename: function (req, file, callback) {
//         callback(null, file.fieldname + '-' + Date.now()+'.'+file.originalname.split('.')[1]);
//     }
// });
//https://res.cloudinary.com/dm5jn4y7u/image/upload/v1610782549/Letique_2021/file-1610782548173.jpg.jpg
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: (req, file) => 'Letique_2021',
        format: async (req, file) => {
            return 'jpeg';
        },
        public_id: (req, file) => file.fieldname + '-' + Date.now(),
    },
});
const upload = multer({ storage : storage});

module.exports = function(app) {
    let item = require('../controllers/Page.controller');
    app.route('/getAll').get(item.getAll);
    app.route('/getItemById').post(item.getItemById);
    app.route('/addItems').post(upload.single('file'),item.addItem);
    app.route('/removeItems').post(item.removeItem);
    app.route('/changeItems').post(item.changeItems);
    app.route('/send').post(item.send);
    app.route('/sendUser').post(item.sendUser);
    app.route('/sendContact').post(item.sendContact);
};
