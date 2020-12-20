const mongoose = require('mongoose');
const fruit = mongoose.model('fruits');
const fs = require('fs');
let nodemailer = require('nodemailer');
let db = mongoose.connection;

exports.getAll = function (req,res) {
    fruit.find({},(err,item)=>{
        if(err) throw err;
        res.send(item);
    })
};
exports.addItem = function (req,res) {
    let title = new fruit({Name: req.body.Name, Weight: req.body.Weight, Price: req.body.Price, Image: req.files[0].filename});
    title.save(function (err,done) {
        if (err) return console.error(err);
        console.log("Document inserted succussfully!");
    });
    res.send('ok')
};
exports.removeItem = function(req,res){
    fruit.findOneAndRemove({_id: req.body.id},(err,res)=>{
        if(err) throw err ;
    });
    res.send('ok');
};
exports.changeItems = function(req,res){
    fruit.findOneAndUpdate({_id: req.body.id},{Name: req.body.Name, Weight: req.body.Weight, Price: req.body.Price},(err,res)=>{
        if(err) throw err;
    });
    res.send('ok');
};
exports.send = function (req,res) {
    let transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure:true,
        tls:{
            rejectUnauthorized:false
        },
        auth: {
            user: "houstonmotors2020@gmail.com",
            pass: "houston2020"
        }
    });
    transporter.sendMail({
        from: "houstonmotors2020@gmail.com",
        to: "houstonmotors2020@gmail.com",
        subject: "Message from Houston Motors",
        text: `Name: ${req.body.name}, Email: ${req.body.email}, Phone: ${req.body.phone},Address:${req.body.address}, Message: ${req.body.message}`,
    }, function (error, sending) {
        if(error) {
            console.log(error);
            return res.status(400).send(false);
        }else {
            res.send(true)
        }
    });
};