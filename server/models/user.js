
const mongoose = require('mongoose');
const validtor = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');

const uniqueValidator = require('mongoose-unique-validator');


const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
    firstname : {
        type:String,
        trim:true,
        minlength:1,
        required:true
    },
    lastname:{
        type:String,
        trim:true,
        minlength:1,
        required:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:true,
        validate:{
            validator:(value)=>{
                return validtor.isEmail(value);
            },
            message:'{VALUE} is not a valid email'
        }
    },
    password:{
        type:String,
        minlength:8,
        trim:true,
        required:true
    },
    tokens:[{
        access:{
            type:String,
            required:true,
        },
        token:{
            type:String,
            required:true
        }
    }]

});

//generating instance methods 
UserSchema.methods.toJSON = function (){
    var user = this;
    console.log('userfrom json', user);
    console.log(typeof(user));
    return _.pick(user,['_id','email','token']);
};


// Generating the Tokens for the user
UserSchema.methods.generateAuthToken = function (){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({
        _id:user._id.toHexString(),
        access,
        iat:new Date().getTime()
    },'abc123').toString();  
    user.tokens.push({access,token});
    
    return user.save().then(()=>{
        return token;
    });
};

// Catch user By Token

UserSchema.statics.findByToken = function(token){
    var User = this;
    var decoded;
    try {
        decoded = jwt.verify(token,'abc123');
    }
    catch(e){
        return Promise.reject();
    }
    return User.findOne({
        '_id':decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    });
};
 
//Check the credintatls 

UserSchema.statics.findByCredintal=function(email,password){
    var user = this;
    return user.findOne({email:email}).then(function(user){
        
        if(!user){
            return Promise.reject();
        }
        return new Promise((resolve,reject)=>{
            bcrypt.compare(password,user.password,(err,res)=>{
                if(res){
                    resolve(user);
                }
                else{
                     reject('enter a correct data');
                }
            });
        });
    });
}




//Hash the passwords of the user
UserSchema.pre('save',function(next){
    var user = this;
    if(user.isModified('password')){
        bcrypt.hash(user.password,13).then(function(hash){
            user.password = hash;
            next();
        });
    }
    else {
        next();
    }
});

UserSchema.plugin(uniqueValidator, { message: 'email must be unique' });

var User = mongoose.model('user',UserSchema);
module.exports = User;