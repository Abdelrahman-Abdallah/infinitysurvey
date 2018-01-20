const bodyparser = require('body-parser');
const express = require('express');
const _ = require('lodash');
const Survey = require('../models/survey');
const {auth} = require('../middleware/Auth');

const mongoose= require('../db/db');

var Route = express.Router();
 // Survey Route  /survey
Route.get('/:id',auth,function(req,res){
    var id = req.params.id;
        Survey.findOne({'user_id':req.user_id,'_id':id}).exec().then((survey)=>{
            if(!survey) {
                return Promise.reject('no survey found');
            }
            var result = _.pick(survey,['title','questions','restricted','user_id','_id','expiredate']);
            res.status(200).send(result);
        }).catch((e)=>{
            res.status(404).send(e);
        });
});
// Get all survey that user has created
Route.get('/',auth,function(req,res){
   /*  Survey.find({'user_id':req.userid}).exec().then() */
   /* {'_id':1,'title':1} */
    Survey.find({user_id:req.user_id}).exec().then((doc)=>{
       /*  if(doc.length === 0){
            console.log('the array is empty');
            return res.status(200).send();
        } */
        console.log('user survyes are',doc);
        var surveys = [];
        for(var item =0; item < doc.length;item++){
            var result = _.pick(doc[item],['title','questions','restricted','user_id','_id','expiredate']);
            surveys.push(result);
        }
        
        res.status(200).send(surveys);
    }).catch((err)=>{
        console.log(err);
        res.status(400).send(err);
    });


}); 


// Get the Survey for the guest user
Route.get('/guest/:id',function(req,res){
    /*  Survey.find({'user_id':req.userid}).exec().then() */
    /* {'_id':1,'title':1} */
     Survey.findOne({'_id':req.params.id}).exec().then((doc)=>{
         if(!doc) ;
         if(doc.length === 0){
             console.log('the array is empty');
             return Promise.reject('the user have no survey created yet');
         }
         var new_data = _.pick(doc,['title','questions','restricted','user_id','id']);
         res.status(200).send(new_data);
     }).catch(err=>{
         console.log(err);
         res.status(400).send(err);
     });
 
 
 });
  //Getting the answers from the guest User
 Route.post('/guest/:id',function(req,res){
    console.log('getting the survey from the guest');
    var answers = req.body;
     Survey.findOne({'_id':req.params.id}).exec().then((doc)=>{
         if(!doc) ;
         if(doc.length === 0){
             console.log('the array is empty');
             return Promise.reject('the user have no survey created yet');
         }
         console.log('Editing the Survey the survey');
         for(var i=0; i<answers.length;i++){
                for(var n=0; n < doc.questions.length;n++){
                    if(doc.questions[n]._id == answers[i].questionID){ //getting the question i self
                        
                        if(answers[i].questionType != 'textarea'){   // check for the type of answers
                        for(var x = 0; x < doc.questions[n].answers.length;x++){
                        
                            if(doc.questions[n].answers[x]._id == answers[i].answerID){
                                /* console.log(' ');
                                console.log(answers[i].questionType);
                                console.log('sussceffuly getting the answers');
                                console.log('doc answer id is ', doc.questions[n].answers[x]._id);
                                console.log('guest answers  id ',answers[i].answerID); */
                                doc.questions[n].answers[x].count +=1;   
                                break;
                                }
                            }
                        }
                        else {
                            //doc.questions[n].value.push(answer[i].answer);
                            doc.questions[n].value.push(answers[i].answer);
                            /* console.log('this question is texarea');
                            doc.questions[n].answers.push(answers[i].answer); */
                            //doc.questions[n].answers[0].push(answers[i].answer);
                        }
                        break;
                    }
                
                //doc.updatequestionbyid(answers[i].questionID,answers[i].answerID,answers[i].type);
             /* doc.findOneAndUpdate({'doc.questions._id':answers.questionID,'doc.questions.answers._id':answers.answerID},{$inc:{count:+1}}).exec().then((res)=>{
                 console.log(res);
                 new_body= res;
             }).catch((e)=>{
                 console.log(e);
                 res.status(400).send(e);
             });*/
             }
         }
         /* console.log('the document after edit');
         console.log(JSON.stringify(doc,null,2)); */
         doc.save().then((newone)=> {
             res.send(newone);
         }).catch(err=>res.send(e));
     }).catch(err=>{
         console.log(err);
         res.status(400).send(err);
     });
 
 
 });
// Get last 20 survey that the user created
Route.get('/latest',auth,function(req,res){
res.send('/lasted');
});
Route.post('/',auth,function(req,res){
    var body = _.pick(req.body,['title','questions','database','expiredate']);
    console.log(body.database.length);
    if(body.database.length > 0 ){
        body.restricted = true;
    }
    else {
        body.restricted = false;
    }
    //body.date = new Date().toString();
    console.log(body);
    body.user_id = req.user_id;
    var survey = new Survey(body);
        survey.save().then((doc)=>{
            console.log(doc);
            res.send(doc);
        }).catch((e)=>{
            res.status(400).send(e);
        });
   
    
});
// Make the login user to edit some of survey options like title , end date , etc

Route.patch('/:id',auth,function(req,res){
    var id = req.params.id;
    var body = _.pick(req.body,['title']);
    Survey.findOneAndUpdate({'user_id':req.user_id,'_id':id},{$set:body},{new:true}).exec().then((survey)=>{
        res.status(200).send(survey);
    }).catch((e)=>{
        res.status(404).send(e);
    });
});


// Listing the surveys for the user to select on of them to get questions 
//  ================= api/survey/list/ id of the survey
/* Route.get('/getsurveyquestions',auth,function(req,res){
    console.log('listing');
    /* Survey.find({user_id:req.user_id}).exec().then((surveys) => {
        console.log(surveys);
        res.send(surveys);
    }).catch((err)=>{
        res.send({err:err,message:'err yasta'});
    }); 
});*/



Route.get('/list',auth,function(req,res){
    console.log('listing');
    res.send('listing');
})
// Getting defined Question for Single Survey
// =================== api/getsurveyquestions/:id
Route.get('/getsurveyquestions/:id',auth,function(req,res){
    var id = req.params.id;
    Survey.find({'user_id':req.user_id,'_id':id},{
        "questions.question":1,"questions.answers.answer":1,'questions.type':1
    }).exec().then((data)=>{
        if(!data){
            return Promise.reject('no data found');
        }
        res.send(data);
    }).catch((e)=>{
        res.send(err);
    });
});






/* Route.get('/test/:id',function(req,res){
    var id = req.params.id;
    questionid= '5a170ec92559730650e6948e';
    Survey.find({'_id':id,'questions._id':questionid},{'questions.$':1}).then(function(doc){
        doc.update({'questions.answers._id':'5a170ec92559730650e69491'},{ $set: { count: 20 }}).exec().then((ires)=>{
            res.send(ires);
        })
        res.send(doc);
    });
}); */


module.exports= Route;


