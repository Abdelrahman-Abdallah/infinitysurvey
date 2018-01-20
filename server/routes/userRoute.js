
const bodyparser = require('body-parser');
const express = require('express');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const {auth} = require('../middleware/Auth');
const bcrypt = require('bcrypt');


// import models  
const User= require('../models/user');



// The Router 
var Route = express.Router();


// Get the current user data 
Route.get('/',auth,function(req,res){
    console.log(req.user_id);
    User.findById(req.user_id).exec().then((user)=>{
        console.log('getting the user data route');
        console.log(user);

        if(!user){
            return Promise.reject();
        }
        var data = _.pick(user,['firstname','lastname','email']) ;
        res.status(200).send(data);

    }).catch((err)=>{
        res.status(400).send(err , 'err in getting user data');
    });


});


// Post New User
Route.post('/',function(req,res){
    console.log('post user');
    var body = _.pick(req.body,['firstname','lastname','email','password','birthdate']);
 
    console.log(body);
     var user = new User(body);
        user.save().then((user)=>{
            res.status(200).send(user);
        }).catch((err)=>{
            console.log('posting new user error');
            console.log(err);
            if(err.code == '11000'){
                err = {
                    code: 11000,
                    errmsg:"dblicated email try with another one"
                };
            }
            res.status(400).send(err);
        }
        ); 

});


//  Login the user and return the token and the email
Route.post('/login',function(req,res){
    var body = _.pick(req.body,['email','password']);
    
    User.findByCredintal(body.email,body.password).then((user)=>{
        /* if(user.tokens.length > 5){
            user.tokens = [];
            user.save();
        } */
       return user.generateAuthToken().then((token)=>{
        user.token = token;
        res.header('x-auth',token).send(user);        
       });
    }).catch((e)=>{
        res.status(400).send('enter a correct data');
    });

});
// check the user login
Route.get('/check',auth,function(req,res){
    res.send(req.token);
    
    console.log('check the login of the user');
    
});


// Loggin out the user 

Route.delete('/logout',auth,(req, res ) =>{
    console.log('hello delete the user');

    User.findOneAndUpdate({'tokens.token':req.token},{$pull: { tokens: { token :req.token }
      }}).exec().then((user)=>{
        console.log(user);
        res.send(user);
    }).catch((e)=>{
        console.log(e);
        res.send(e);
    })
});


Route.get('/me',auth,function(req,res){
    console.log('hello from me router');
    console.log(req.user,req.token);
   res.status(200).send(req.user);
});

Route.delete('/',function(req,res){
    console.log('user delete Route');
    res.send({path:"DELETE"});
});

Route.patch('/userdata',auth,function(req,res){
    
    console.log('path path');
    const data = _.pick(req.body,['firstname','lastname','email']);
    User.findByIdAndUpdate(req.user_id,data).exec().then((doc)=>{
        console.log('data Updated');
        console.log(doc);
        res.send(doc);
    }).catch((err)=>{
        console.log(err);
        res.send(err);
    })
    console.log(data);
});



module.exports = Route;