require('./models/user.model');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
let passport = require('passport');
// const formidableMiddleware = require('express-formidable');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
// app.use(formidableMiddleware());
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use('/static', express.static('./UploadFiles'));
//
app.use(passport.initialize());
app.use(passport.session());
require('./passport')();
require('./initial')();
require('./models/page.model');
require('./models/user.model');
require('./routes/page.route')(app);
require('./routes/user.route')(app);
//Set up default mongoose connection
let mongoDB = 'mongodb://127.0.0.1/FruitDB';
mongoose.connect(mongoDB,  {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

//Get the default connection
let db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

'use strict';

// var os = require('os');
// var ifaces = os.networkInterfaces();
// let host = 'localhost';
// Object.keys(ifaces).forEach(function (ifname) {
//     var alias = 0;
//
//     ifaces[ifname].forEach(function (iface) {
//         if ('IPv4' !== iface.family || iface.internal !== false) {
//             // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
//             return;
//         }
//
//         if (alias >= 1) {
//             // this single interface has multiple ipv4 addresses
//             console.log(ifname + ':' + alias, iface.address);
//         } else {
//             // this interface has only one ipv4 adress
//             host = iface.address;
//         }
//         ++alias;
//     });
// });
// console.log(host);
// const PORT = 8080;
// app.listen( PORT , host);
let http = require('http');
let port = (process.env.PORT || '8080');

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

var os = require('os');
var ifaces = os.networkInterfaces();
var ip;
// Object.keys(ifaces).forEach(function (ifname) {
//   var alias = 0;
//   ifaces[ifname].forEach(function (iface) {
//     if ('IPv4' !== iface.family || iface.internal !== false) {
//       // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
//       return;
//     }

//     if (alias >= 1) {
//       // this single interface has multiple ipv4 addresses
//       console.log(ifname + ':' + alias, iface.address);
//     } else {
//       // this interface has only one ipv4 adress
//       if (ifname == "Wi-Fi") {
//         ip = iface.address
//       }
//     }
//     ++alias;
//   });
// });
if (!ip) {
    ip = 'localhost'
}
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, ip, (err) => {
    if (err) return console.log(err);
    console.log('server listen on', ip + ':' + port)
});