const bodyparser = require('body-parser');
const express = require('express');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const {auth} = require('../middleware/Auth');
const bcrypt = require('bcrypt');
const multer = require('multer');
var path = require('path')

var upload = multer({dest: './uploads/'}).single('photo');


// import models  


// The Router 
var Route = express.Router();

Route.post('/',function(req,res){

    var path = '';
     upload(req, res, function (err) {
        if (err) {
          // An error occurred when uploading
          console.log(err);
          return res.status(422).send("an Error occured")
        }  
       // No error occured.
        path = req.file.path;
        return res.send("Upload Completed for "+path); 
  });  


});

Route.get('/',function(req,res){
    res.send('hello from get router');
});

module.exports = Route;

