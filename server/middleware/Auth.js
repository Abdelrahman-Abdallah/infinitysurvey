var User = require('../models/user');
var auth = function(req,res,next){
    
        var token = req.header('x-auth');
        User.findByToken(token).then((user)=>{
            //console.log('user from found by token : ',user);
            if(!user){
                return Promise.reject({message:"Loggin Required"});
            }
            req.user_id = user._id;
            req.token = token;
            next();
        }).catch((e)=>{
            res.status(401).send({error:e,message:'login required'});
        });
    };
module.exports  = {auth};