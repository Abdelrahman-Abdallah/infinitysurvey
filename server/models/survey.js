const mongoose = require('mongoose');
const validtor = require('validator');

const Schema = mongoose.Schema;

const answersSchema = new Schema({
    answer:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        default:0
    }
});
const questionSchema = new Schema({
    question:{
        type:String,
        trim:true,
        _id:mongoose.Types.ObjectId,
        required:true
    },
    type:{
        type:String,
        required:true,
        trim:true      
    },
    answers:{
        type:[answersSchema],
    },
    value:{
        type:Array
    }
});
 
const SurveySchema = new Schema({
    title :{
        type :String,
        trim:true,
        required:true
    },
    expiredate :{
        type: String,
    },
    restricted: {
        type:Boolean,
        default:false,
    },
    user_id:{
        type : String,
        required:true  
    },
    database :[],
    questions:[questionSchema]
});

/* SurveySchema.methods.updatequestionbyid = function(question_id,answer_id,type){
    var survey= this;
    console.log('inside the survey update method');
    console.log('id',question_id,'answerid',answer_id,'type',type);
    this.model('survey').findOneAndUpdate({'questions._id':question_id,'questions.answers._id':answer_id},{$inc:{count:1}},{new:true}).exec().then((res)=>{
        console.log(JSON.stringify(res));

    }).catch((e) => {
        console.log(e);
    });
    /* Survey.findOneAndUpdate({'questions._id':question_id,'questions.answers._id':answer_id},{$inc:{count:1}},{new:true}).exec().then((res)=>{
        console.log(JSON.stringify(res));
    }).catch((e) => {
        console.log(e);
    }); 
    

} */

var Survey = mongoose.model('survey',SurveySchema);
module.exports = Survey;