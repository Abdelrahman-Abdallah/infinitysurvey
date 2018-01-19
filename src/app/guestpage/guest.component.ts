import { Router,ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Http , Response} from '@angular/http';
import { Component, OnInit ,AfterViewInit ,OnChanges} from '@angular/core';
import { log } from 'util';
import { FormGroup } from '@angular/forms/src/model';
import { LinksService } from '../links.service';

import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-view',
  templateUrl: './guest.component.html',

  styleUrls: ['./guest.component.css'],
})
export class GuestComponent implements OnInit {
    targetId = '';
    values = [];
    buttonSubmit = false;
    errShow = true;
    arrayOfChoosenId = [];
    id = '';
    data;
/*
  questions = {'_id' : '5a1a7b1ee2ff1615549bdc12',
  'title' : 'MT-265',
  'questions' : [
      {
          'question' : 'First Quesiton',
          'type' : 'radio',
          '_id' : '5a1a7b1ee2ff1615549bdc1f',
          'answers' : [
              {
                  'answer' : 'first answer',
                  '_id' : '5a1a7b1ee2ff1615549bdc22'
                  
              },
              {
                  'answer' : 'second answer',
                  '_id' : '5a1a7b1ee2ff1615549bdc21'
              },
              {
                  'answer' : 'third answer',
                  '_id' : '5a1a7b1ee2ff1615549bdc20'

              }
          ]
      },
      {
          'question' : 'Second Quesition',
          'type' : 'checkbox',
          '_id' : '5a1a7b1ee2ff1615549bdc1b',
          'answers' : [
              {
                  'answer' : 'first answer',
                  '_id' : '5a1a7b1ee2ff1615549bdc1e'

              },
              {
                  'answer' : 'second answer',
                  '_id' : '5a1a7b1ee2ff1615549bdc1d'

              },
              {
                  'answer' : 'third answer',
                  '_id' : '5a1a7b1ee2ff1615549bdc1c'

              }
          ]
      }
      ,
      {
          'question' : 'third Question',
          'type' : 'radio',
          '_id' : '5a1a7b1ee2ff1615549bdc17',
          'answers' : [
              {
                  'answer' : 'first answer',
                  '_id' : '5a1a7b1ee2ff1615549bdc1a'

              },
              {
                  'answer' : 'second answer',
                  '_id' : '5a1a7b1ee2ff1615549bdc19'

              },
              {
                  'answer' : 'third answer',
                  '_id' : '5a1a7b1ee2ff1615549bdc18'
              }
          ]
      },
      {
          'question' : 'Fourth Question',
          'type' : 'radio',
          '_id' : '5a1a7b1ee2ff1615549bdc13',
          'answers' : [
              {
                  'answer' : 'first answer',
                  '_id' : '5a1a7b1ee2ff1615549bdc16'
              },
              {
                  'answer' : 'second answer',
                  '_id' : '5a1a7b1ee2ff1615549bdc15'
              },
              {
                  'answer' : 'third answer',
                  '_id' : '5a1a7b1ee2ff1615549bdc14'
              }
          ]
      },
      {
        'question' : 'Fifth Quesition',
        'type' : 'checkbox',
        '_id' : '5a1a7',
        'answers' : [
            {
                'answer' : 'first answer',
                '_id' : '5a1a7b1ee249bdc1e'

            },
            {
                'answer' : 'second answer',
                '_id' : '5a1a7b1615549bdc1d'

            },
            {
                'answer' : 'third answer',
                '_id' : '5a1a7bff1615549bdc1c'

            }
        ]
    },
    {
      'question' : 'sixth Quesition',
      'type' : 'textarea',
      '_id' : '5a1a7fnwbbbbuu',

  },
  {
    'question' : 'seventh Quesition',
    'type' : 'textarea',
    '_id' : '5a1a7fnwyytybbbbuu',

}
  ],
  'database' : [],
  'restricted' : false,
  '__v' : 0
  };*/
questions: any= '';
  constructor(private _http: Http,  private Router: Router, private Active:ActivatedRoute,private links:LinksService) { 
   
  }

  ngOnInit() {
    console.log('hello2');
    this.id = this.Active.snapshot.params.id;
    console.log(this.id);
    this._http.get(`${this.links.getlink()}survey/guest/${this.id}`).subscribe((res: Response) => {
        console.log("Res is :",res);
        this.data = res;
        this.questions = this.data._body;
        this.questions = JSON.parse(this.questions);
        
        console.log("New Res : ",this.questions);
        console.log("hello1");
    }, (err) => console.log(err));
  }
//   ngAfterViewInit(){
     
// }
// ngOnChanges(changes: SimpleChanges){

//     console.log("changes is : ",changes);
// }

checkFormValid(form: NgForm){
    console.log(form);
    var counter=0;
     this.values = form.value;
    var x;
    var y;
    for(y in this.values){
        if(y =="checkbox")
        {
        for (x in this.values[y])
        {
       
            
            var val = this.values[y];
        if(val[x] == true && x !='false' && x != "")
        {
            
            var arr ;
            arr = x.split('+');
            this.arrayOfChoosenId.push({
                                    questionType:'checkbox',
                                    questionID: arr[0],
                                    answerID: arr[1]
                                });
                                   
                               
            // console.log('question ID :',arr[0],'& Answer ID : ',arr[1]);
        }
    }}
        if(y == "radio") 
        {
            // if( this.values[x] =='false' || this.values[x] == "")
            // {
            //     continue;
            // }
            for (x in this.values[y])
            {
                var val = this.values[y];
                if(val[x] != ""){
            this.arrayOfChoosenId.push({
                questionType:'radio',
                questionID: x,
                answerID: val[x]
            });
        }
            // console.log('Question ID :',x,'Answer ID :',this.values[x]);
        }
    }
    if(y == "textarea"){
        for (x in this.values[y])
        {
            var val = this.values[y];
        this.arrayOfChoosenId.push({
            questionType:'textarea',
            questionID: x,
            answer: val[x]
        });
    }
    }
}

///////////////////////////////
var mainQuestionsLen = this.questions.questions.length;
console.log('Len = ',mainQuestionsLen);
var choosenQuestionsLen = this.arrayOfChoosenId.length;
var mainQuestions = this.questions.questions;
var newChoosenArr = this.arrayOfChoosenId;
console.log("New Choosen : ",newChoosenArr);
console.log("choosen Len : ",choosenQuestionsLen);

for (var i = 0;i<mainQuestionsLen;i++){
    if(choosenQuestionsLen == 0){
        this.targetId =mainQuestions[0]._id ;
        console.log("This Target ID :",this.targetId);
        document.getElementById(this.targetId).scrollIntoView({behavior : "smooth",block:"start"});
        break;
    }
    for(var j = 0;j<choosenQuestionsLen;j++){
        //choosenArray[j].questionID
      //   var QuesId = Questions.questions.indexOf('5a1a7fnwyytybbbbuu');
      //   if(QuesId != -1){
      //     console.log(choosenArray[j].questionID);
      if(mainQuestions[i]._id == newChoosenArr[j].questionID)
      {
        counter++;
        console.log("counter is : ",counter);
        // console.log("id 1 : ",mainQuestions[i]._id," id 2 :",newChoosenArr[j].questionID);
        break;
        
      }
      
    else if(mainQuestions[i]._id != newChoosenArr[j].questionID && j == choosenQuestionsLen-1){
        // console.log("id 1 : ",mainQuestions[i]._id," id 2 :",newChoosenArr[j].questionID);
        console.log("Missing Question is : ",mainQuestions[i].question);
        this.errShow = false;
        this.arrayOfChoosenId = [];
        
        this.targetId =mainQuestions[i]._id ;
        console.log("This Target ID :",this.targetId);
        document.getElementById(this.targetId).scrollIntoView({behavior : "smooth",block:"start"});
        
        break;
    }
      else
      {
        // console.log("id 1 : ",mainQuestions[i]._id," id 2 :",newChoosenArr[j].questionID);
          continue;
        // console.log(this.questions.questions[i]._id);
      }
      }
      if(counter == mainQuestionsLen){
        // this.hiddenSubmit = false;
        //    this.validForm = true;
        this.errShow = true;
        console.log('Counter is : ',counter);
       this.targetId = '';
       this.onSubmit(newChoosenArr);
        break;
    }
    }
  
  
}

  onSubmit(targetArrayOfChoosenIDs) {
      /////////////////////////////////////////
      
    console.log('Form Submitted Successfully !');
    this.buttonSubmit = true;
    console.log(targetArrayOfChoosenIDs);

    this._http.post(this.links.getlink() + 'survey/guest/' + this.id, targetArrayOfChoosenIDs).subscribe((res: Response) => {
        console.log(res.json());
      }, (err) => { 
        console.log(err);
      });
    
////////////////////////////////////
/*var mainQuestionsLen = this.questions.questions.length;
console.log('Len = ',mainQuestionsLen);
var choosenQuestionsLen = this.arrayOfChoosenId.length;
console.log("choosen Len : ",choosenQuestionsLen);
for (var i = 0;i<mainQuestionsLen;i++){
    for(var j = 0;j<choosenQuestionsLen;j++){
        //choosenArray[j].questionID
      //   var QuesId = Questions.questions.indexOf('5a1a7fnwyytybbbbuu');
      //   if(QuesId != -1){
      //     console.log(choosenArray[j].questionID);
      if(this.questions.questions[i]._id == this.arrayOfChoosenId[j].questionID)
      {
        console.log('True');
        counter++;
        break;
      }
    
      else
      {
          continue;
        // console.log(this.questions.questions[i]._id);
      }
      }
    }
    if(mainQuestionsLen != counter){
        this.validForm = true;
        console.log('Counter is : ',counter);
    }
    console.log(this.arrayOfChoosenId);*/
    /////////////////////////////////////////////
  /*
   var x;
    var y;
    for(y in this.values){

    for (x in this.values[y])
    {
        if(y =="checkbox")
        {
            
        
        if(this.values[x] == true && this.values[x] !='false' && this.values[x] != "")
        {
            
            var arr ;
            arr = x.split('+');
            this.arrayOfChoosenId.push({
                                    questionType:'checkbox',
                                    questionID: arr[0],
                                    answerID: arr[1]
                                });
                                   
                               
            // console.log('question ID :',arr[0],'& Answer ID : ',arr[1]);
        }
    }
        else 
        {
            // if( this.values[x] =='false' || this.values[x] == "")
            // {
            //     continue;
            // }
            this.arrayOfChoosenId.push({
                questionType:'radio',
                questionID: x,
                answerID: this.values[x]
            });
            // console.log('Question ID :',x,'Answer ID :',this.values[x]);
        }
    }
}
    console.log(this.arrayOfChoosenId);
  
  
  
  */ 
    // this.values = form.value;
    // var x;
    
    // for (x in this.values)
    // {
    //     //console.log(x);
    //     if(typeof(this.values[x].answer) !== "undefined")
    //     {
    //         this.arrayOfChoosenId.push({
    //             questionId:x,
    //             answerId:this.values[x].answer});
    //        // console.log(this.values[x].answer);
    //     }
    //     else
    //     {
    //         var w = this.questions.questions.length;
    //       for(var i=0;i<w;i++)
    //       {
    //           if(this.questions.questions[i]._id == x){
    //             //console.log(this.values[x].i);
               
    //             for (var y in this.values[x])
    //             {
    //                // console.log(y);
    //                var newValues = this.values[x];
    //                if(newValues[y].answer == true)
    //                {

    //                 this.arrayOfChoosenId.push({
    //                     questionId: this.questions.questions[i]._id,
    //                     answerID: this.questions.questions[i].answers[y]._id});
    //                    //console.log(this.questions.questions[i].answers[y]._id);
    //                } 
    //                // console.log(newValues[y]);
    //             }
                  
    //           }
    //       }  
    //     }
        
    // }
   // console.log('sumbite');
  //  console.log(this.questions.questions[0]);
//    console.log(form.value['this.questions.questions[0]']);
  }
}




/* export class GuestComponent implements OnInit {
    values = [];
    arrayOfChoosenId = [];
    id= '';
    questions: any= '';
  questionsss: any = {'_id' : '5a1a7b1ee2ff1615549bdc12',
  'title' : 'first title',
  'questions' : [
      {
          'question' : 'First Quesiton',
          'type' : 'radio',
          '_id' : '5a1a7b1ee2ff1615549bdc1f',
          'answers' : [
              {
                  'answer' : 'first answer',
                  '_id' : '5a1a7b1ee2ff1615549bdc22'
              },
              {
                  'answer' : 'second answer',
                  '_id' : '5a1a7b1ee2ff1615549bdc21'
              },
              {
                  'answer' : 'third answer',
                  '_id' : '5a1a7b1ee2ff1615549bdc20'

              }
          ]
      },
      {
          'question' : 'Second Quesition',
          'type' : 'checkbox',
          '_id' : '5a1a7b1ee2ff1615549bdc1b',
          'answers' : [
              {
                  'answer' : 'first answer',
                  '_id' : '5a1a7b1ee2ff1615549bdc1e'

              },
              {
                  'answer' : 'second answer',
                  '_id' : '5a1a7b1ee2ff1615549bdc1d'

              },
              {
                  'answer' : 'third answer',
                  '_id' : '5a1a7b1ee2ff1615549bdc1c'

              }
          ]
      }
      ,
      {
          'question' : 'third Question',
          'type' : 'radio',
          '_id' : '5a1a7b1ee2ff1615549bdc17',
          'answers' : [
              {
                  'answer' : 'first answer',
                  '_id' : '5a1a7b1ee2ff1615549bdc1a'

              },
              {
                  'answer' : 'second answer',
                  '_id' : '5a1a7b1ee2ff1615549bdc19'

              },
              {
                  'answer' : 'third answer',
                  '_id' : '5a1a7b1ee2ff1615549bdc18'
              }
          ]
      },
      {
          'question' : 'Fourth Question',
          'type' : 'radio',
          '_id' : '5a1a7b1ee2ff1615549bdc13',
          'answers' : [
              {
                  'answer' : 'first answer',
                  '_id' : '5a1a7b1ee2ff1615549bdc16'
              },
              {
                  'answer' : 'second answer',
                  '_id' : '5a1a7b1ee2ff1615549bdc15'
              },
              {
                  'answer' : 'third answer',
                  '_id' : '5a1a7b1ee2ff1615549bdc14'
              }
          ]
      },
      {
        'question' : 'Fifth Quesition',
        'type' : 'checkbox',
        '_id' : '5a1a7',
        'answers' : [
            {
                'answer' : 'first answer',
                '_id' : '5a1a7b1ee249bdc1e'

            },
            {
                'answer' : 'second answer',
                '_id' : '5a1a7b1615549bdc1d'

            },
            {
                'answer' : 'third answer',
                '_id' : '5a1a7bff1615549bdc1c'

            }
        ]
    },
    {
      'question' : 'sixth Quesition',
      'type' : 'textarea',
      '_id' : '5a1a7fnwbbbbuu',

  },
  {
    'question' : 'sihhxth Quesition',
    'type' : 'textarea',
    '_id' : '5a1a7fnwyytybbbbuu',

}
  ],
  'database' : [],
  'restricted' : false,
  '__v' : 0
};
  constructor(private _http: Http, private activatedRoute: ActivatedRoute, private links: LinksService) { }

  ngOnInit() {
      this.id = this.activatedRoute.snapshot.params.id;
      //5a1a7b1ee2ff1615549bdc12
    this._http.get(this.links.getlink() + 'survey/guest/' + this.id).subscribe((res: Response) => {
            const data = res.json();
            this.questions = data;
          }, (err) => {
            console.log(err);
          });
  }
//   "5a1a7b1ee2ff1615549bdc1b": {
//     "0": 
//     {
//       "answer": true
//     },
//     "1": 
//     {
//       "answer": ""
//     },
//     "2":
//      {
//       "answer": ""
//     }
// }
// testBut(u){
//     console.log('U is here',u);
// }
  onSubmit(form: NgForm) {

    this.arrayOfChoosenId = [];
    console.log(form);
     this.values = form.value;
    let x;
    let y;
    for( let y in this.values){
        if(y == "checkbox")
        {
        for (x in this.values[y])
        {
            var val = this.values[y];
        if(val[x] == true && x !='false' && x != "")
        {
            var arr ;
            arr = x.split('+');
            this.arrayOfChoosenId.push({
                                    questionType:'checkbox',
                                    questionID: arr[0],
                                    answerID: arr[1]
                                });
                                   
                               
            // console.log('question ID :',arr[0],'& Answer ID : ',arr[1]);
        }
    }}
        if(y == "radio") 
        {
            // if( this.values[x] =='false' || this.values[x] == "")
            // {
            //     continue;
            // }
            for (x in this.values[y])
            {
                var val = this.values[y];
            this.arrayOfChoosenId.push({
                questionType:'radio',
                questionID: x,
                answerID: val[x]
            });
            // console.log('Question ID :',x,'Answer ID :',this.values[x]);
        }
    }
    if(y == "textarea"){
        for (x in this.values[y])
        {
            var val = this.values[y];
        this.arrayOfChoosenId.push({
            questionType:'textarea',
            questionID: x,
            answer: val[x]
        });
    }
    }
}
    console.log(this.arrayOfChoosenId);
    this._http.post(this.links.getlink() + 'survey/guest/' + this.id, this.arrayOfChoosenId).subscribe((res: Response) => {
        console.log(res.json());
      }, (err) => { 
        console.log(err);
      });

  /*
   var x;
    var y;
    for(y in this.values){

    for (x in this.values[y])
    {
        if(y =="checkbox")
        {
            
        
        if(this.values[x] == true && this.values[x] !='false' && this.values[x] != "")
        {
            
            var arr ;
            arr = x.split('+');
            this.arrayOfChoosenId.push({
                                    questionType:'checkbox',
                                    questionID: arr[0],
                                    answerID: arr[1]
                                });
                                   
                               
            // console.log('question ID :',arr[0],'& Answer ID : ',arr[1]);
        }
    }
        else 
        {
            // if( this.values[x] =='false' || this.values[x] == "")
            // {
            //     continue;
            // }
            this.arrayOfChoosenId.push({
                questionType:'radio',
                questionID: x,
                answerID: this.values[x]
            });
            // console.log('Question ID :',x,'Answer ID :',this.values[x]);
        }
    }
}
    console.log(this.arrayOfChoosenId);
  
  
  
  */ 
    // this.values = form.value;
    // var x;
    
    // for (x in this.values)
    // {
    //     //console.log(x);
    //     if(typeof(this.values[x].answer) !== "undefined")
    //     {
    //         this.arrayOfChoosenId.push({
    //             questionId:x,
    //             answerId:this.values[x].answer});
    //        // console.log(this.values[x].answer);
    //     }
    //     else
    //     {
    //         var w = this.questions.questions.length;
    //       for(var i=0;i<w;i++)
    //       {
    //           if(this.questions.questions[i]._id == x){
    //             //console.log(this.values[x].i);
               
    //             for (var y in this.values[x])
    //             {
    //                // console.log(y);
    //                var newValues = this.values[x];
    //                if(newValues[y].answer == true)
    //                {

    //                 this.arrayOfChoosenId.push({
    //                     questionId: this.questions.questions[i]._id,
    //                     answerID: this.questions.questions[i].answers[y]._id});
    //                    //console.log(this.questions.questions[i].answers[y]._id);
    //                } 
    //                // console.log(newValues[y]);
    //             }
                  
    //           }
    //       }  
    //     }
        
    // }
   // console.log('sumbite');
  //  console.log(this.questions.questions[0]);
//    console.log(form.value['this.questions.questions[0]']);
  //}
//}
 //*/