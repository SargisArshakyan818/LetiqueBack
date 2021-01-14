const mongoose = require('mongoose');
const item = mongoose.model('items');
let nodemailer = require('nodemailer');
const { View } = require("grandjs");
const NewsLetter = View.importJsx('./views/mailView.jsx');

exports.getAll = function (req,res) {
    item.find({},(err,item)=>{
        if(err) throw err;
        res.send(item);
    })
};
exports.addItem = function (req,res) {
    let title = new item({Name: req.body.Name, Description: req.body.Description, Usage: req.body.Usage, Contraindications: req.body.Contraindications, SoldOut: req.body.SoldOut,  Weight: req.body.Weight, Price: req.body.Price, Type: req.body.Type, Count: 0, Image: req.file.filename});
    title.save(function (err,done) {
        if (err) return console.error(err);
        console.log("Document inserted succussfully!", done);
    });
    res.send('ok')
};

exports.removeItem = function(req,res){
    item.findOneAndRemove({_id: req.body.id},(err,res)=>{
        if(err) throw err;
        console.log(res);
    });
    res.send('ok');
};
exports.changeItems = function(req,res){
    item.findOneAndUpdate({_id: req.body.id},{Name: req.body.Name,Description: req.body.description, Usage: req.body.Usage, Contraindications: req.body.Contraindicatoins, SoldOut: req.body.SoldOut, Weight: req.body.Weight, Price: req.body.Price},(err,res)=>{
        if(err) throw err;
        console.log(res);
    });
    res.send('ok');
};
exports.getItemById = function(req,res){
  item.findById( req.body.id, (err,res)=>{
      if (err) throw err;
      console.log(res);
  }).then(data=>{
      res.send(data)
  });
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
            user: "letique.armenia@gmail.com",
            pass: "Letique2021"
        }
    });
    let data = req.body.array;
    let template = View.renderToHtml(NewsLetter, {data});
    transporter.sendMail({
        from: "letique.armenia@gmail.com",
        to: "letique.armenia@gmail.com",
        subject: "Message from Letique Armenia",
        text: `Name: ${req.body.name}, Surname: ${req.body.surname}, Email: ${req.body.email}, Phone: ${req.body.phone},Address:${req.body.address}, Message: ${req.body.message}`,
        html: template,
    }, function (error, sending) {
        if(error) {
            console.log(error);
            return res.status(400).send(false);
        }else {
            console.log(sending);
            res.send(true)
        }
    });
};


exports.sendUser = function (req,res) {
    let transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure:true,
        tls:{
            rejectUnauthorized:false
        },
        auth: {
            user: "letique.armenia@gmail.com",
            pass: "Letique2021"
        }
    });
    let data = req.body.array;
    let template = View.renderToHtml(NewsLetter, {data});
    transporter.sendMail({
        from: "letique.armenia@gmail.com",
        to: req.body.email,
        subject: "Message from Letique Armenia",
        text: `Thank You ${req.body.name}`,
        html: template,
    }, function (error, sending) {
        if(error) {
            console.log(error);
            return res.status(400).send(false);
        }else {
            console.log(sending);
            res.send(true)
        }
    });
};
