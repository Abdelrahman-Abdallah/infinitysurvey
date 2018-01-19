import { SurveyComponentControlService } from './../survey-component-control.service';
import { SurveyComponent } from './../survey.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , Validators , FormBuilder , FormArray} from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  editedIndex ;
  edidedArray ;
  buttonsDisplay = false;

  checkboxForm: FormGroup ;
  display: Boolean = false;
  
  constructor(private componetControl: SurveyComponentControlService,
    private SurveyComponentToEdit: SurveyComponent,
    private builder: FormBuilder) {  }

  ngOnInit() {
    this.componetControl.checkboxInput.subscribe(() => {
      this.checkboxForm.reset();
      this.buttonsDisplay = false;
      this.display = true;
    });
    this.componetControl.CheckboxToEdit.subscribe((arr) => {
     // this.RadioForm.reset();
     this.buttonsDisplay = true;
     this.edidedArray = arr.questionValue;
     this.editedIndex = arr.inexOfEditArray;
     console.log("Edit Subcriped First");
      console.log("Edit Subcriped and arr =",arr.questionValue);
      console.log("َQuestion value 1 ",this.checkboxForm.value.quesitons);
      this.checkboxForm = this.builder.group({
        'quesitons': [arr.questionValue.question, [Validators.required, Validators.minLength(1)]],
        'answers': this.builder.array([])
        
    });
    //reFill Edit form answers
    for(var i = 0 ;i<arr.questionValue.answers.length;i++){
      (<FormArray>this.checkboxForm.get('answers')).push(this.createAnswerToEdit(arr.questionValue.answers[i].answer));
          }
     
     console.log("Question value 2",this.checkboxForm.value.quesitons);
     console.log("Answer 0 =  ",arr.questionValue.answers[0].answer);
       this.display = true;
    });
    this.checkboxForm = this.builder.group({
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
    
    const index = (<FormArray>this.checkboxForm.get('answers')).controls.length;
    console.log(index)
    if ((<FormArray>this.checkboxForm.get('answers')).value[index - 1].answer !== '' && this.checkboxForm.value.answers[0].answer !== null) {
      
      (<FormArray>this.checkboxForm.get('answers')).push(this.createAnswer());      
    }
}
removeAnswer(index) {
  var answersLength = (<FormArray>this.checkboxForm.get('answers')).length;
  if(answersLength >2){
  (<FormArray>this.checkboxForm.get('answers')).removeAt(index);
  }
}
confirmEdit(){
  console.log("index = ",this.editedIndex , "Array = ",this.edidedArray);
  console.log("Survey Questions = ",this.SurveyComponentToEdit.Questions);
  const newQuestion = {
    question: this.checkboxForm.value.quesitons,
    type: 'checkbox',
    answers: this.checkboxForm.value.answers
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
      question: this.checkboxForm.value.quesitons,
      type: 'checkbox',
      answers: this.checkboxForm.value.answers
    };
    this.checkboxForm.reset(); 
    
    this.componetControl.addQuestion(Question);
    console.log(Question);
    //this.signupForm.controls.reset;
    this.close();
  }
  close() {
    
    this.checkboxForm.reset();
    let len = (<FormArray>this.checkboxForm.get('answers')).length;
    
    for(var i=len; i>=1;i--)
    {
      this.removeAnswer(i);
    }
    
   this.display = false;
  }
  
}
