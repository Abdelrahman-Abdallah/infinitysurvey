import { SurveyComponentControlService } from './../survey-component-control.service';
import { SurveyComponent } from './../survey.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , Validators , FormBuilder , FormArray} from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {
  editedIndex ;
  edidedArray ;
  buttonsDisplay = false;

  RadioForm: FormGroup ;
  display: Boolean = false;
  
  constructor(private componetControl: SurveyComponentControlService,
    private SurveyComponentToEdit: SurveyComponent,
    private builder: FormBuilder) {  }

  ngOnInit() {
    
    this.componetControl.radiobutton.subscribe(() => {
      console.log("radioButton2 Subscribed");
      this.RadioForm.reset();
      this.buttonsDisplay = false;
      this.display = true;
    });
    this.componetControl.radiobuttonToEdit.subscribe((arr) => {
     // this.RadioForm.reset();
     this.buttonsDisplay = true;
     this.edidedArray = arr.questionValue;
     this.editedIndex = arr.inexOfEditArray;
     console.log("Edit Subcriped First");
      console.log("Edit Subcriped and arr =",arr.questionValue);
      console.log("َQuestion value 1 ",this.RadioForm.value.quesitons);
      this.RadioForm = this.builder.group({
        'quesitons': [arr.questionValue.question, [Validators.required, Validators.minLength(1)]],
        'answers': this.builder.array([])
        
    });
    //reFill Edit form answers
    for(var i = 0 ;i<arr.questionValue.answers.length;i++){
      (<FormArray>this.RadioForm.get('answers')).push(this.createAnswerToEdit(arr.questionValue.answers[i].answer));
          }
     
     console.log("Question value 2",this.RadioForm.value.quesitons);
     console.log("Answer 0 =  ",arr.questionValue.answers[0].answer);
       this.display = true;
    });
    this.RadioForm = this.builder.group({
      'quesitons': ['', [Validators.required, Validators.minLength(1)]],
      'answers': this.builder.array([this.createAnswer(),this.createAnswer()])
  })
    
   
}

  createAnswer() {
    
    return this.builder.group({
      answer: ['', Validators.required]
    });
    //let u = (<FormArray>this.signupForm.get('answers')).length;
    
  }
  createAnswerToEdit(questionArray) {
    
    return this.builder.group({
      answer: [questionArray, Validators.required]
    });
  }
  addAnswer() {
    
    const index = (<FormArray>this.RadioForm.get('answers')).controls.length;
    console.log(index)
    if ((<FormArray>this.RadioForm.get('answers')).value[index - 1].answer !== '' && this.RadioForm.value.answers[0].answer !== null) {
      
      (<FormArray>this.RadioForm.get('answers')).push(this.createAnswer());      
    }
}
removeAnswer(index) {
  if(index > 1)
  {
  (<FormArray>this.RadioForm.get('answers')).removeAt(index);
  }
}
confirmEdit(){
  console.log("index = ",this.editedIndex , "Array = ",this.edidedArray);
  console.log("Survey Questions = ",this.SurveyComponentToEdit.Questions);
  const newQuestion = {
    question: this.RadioForm.value.quesitons,
    type: 'radio',
    answers: this.RadioForm.value.answers
  };
  var index = this.SurveyComponentToEdit.Questions.indexOf(this.edidedArray);
  console.log("index = ",index);
  this.SurveyComponentToEdit.Questions[index] = newQuestion;
      // this.SurveyComponentToEdit.Questions[this.editedIndex] = this.edidedArray;
      this.display = false;
}
  submit() {
    // console.log(this.signupForm.value)
    
    const Question = {
      question: this.RadioForm.value.quesitons,
      type: 'radio',
      answers: this.RadioForm.value.answers
    };
    this.RadioForm.reset(); 
    
    this.componetControl.addQuestion(Question);
    console.log(Question);
    console.log("Array Length : = >  ",this.SurveyComponentToEdit.Questions.length);
    //this.signupForm.controls.reset;
    this.close();
  }
  close() {
    
    this.RadioForm.reset();
    let len = (<FormArray>this.RadioForm.get('answers')).length;
    
    for(var i=len; i>=1;i--)
    {
      this.removeAnswer(i);
    }
    
   this.display = false;
  }
  
}
