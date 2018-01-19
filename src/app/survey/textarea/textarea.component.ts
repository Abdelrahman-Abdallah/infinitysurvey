import { SurveyComponentControlService } from './../survey-component-control.service';
import { SurveyComponent } from './../survey.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent implements OnInit {
  display: Boolean = false;
  buttonsDisplay = false;
  edidedArray;
  
  
  textareaForm: FormGroup;
  constructor(private componetControl: SurveyComponentControlService,
              private SurveyComponentToEdit: SurveyComponent,
              private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.componetControl.textareaToEdit.subscribe((arr) => {
      console.log(arr);
      this.edidedArray = arr.questionValue;
      this.display = true;
      this.buttonsDisplay = true;
      this.textareaForm = this.formbuilder.group({
        'question': [arr.questionValue.question, Validators.required]
      });
      // this.builder.group({
      //   'quesitons': [arr.questionValue.question, [Validators.required, Validators.minLength(1)]],
      //   'answers': this.builder.array([])
        
    
    });
    this.componetControl.textarea.subscribe(() => {
      this.textareaForm.reset();
      this.display = true;
      this.buttonsDisplay = false;
    } );

    this.textareaForm = this.formbuilder.group({
      'question': ['', Validators.required]
    });
  }
  confirmEdit(){
  const newQuestion = {
    question: this.textareaForm.get('question').value,
    type: 'textarea',
    answers: []
  };
  var index = this.SurveyComponentToEdit.Questions.indexOf(this.edidedArray);
  console.log("index = ",index);
  this.SurveyComponentToEdit.Questions[index] = newQuestion;
      // this.SurveyComponentToEdit.Questions[this.editedIndex] = this.edidedArray;
      this.display = false;
}
  submit() {
    const Question = {
      question: this.textareaForm.get('question').value,
      type: 'textarea',
      answers: []
    };
    this.textareaForm.reset();
    this.display = false ;
    this.componetControl.addQuestion(Question);
  }
  close() {
    this.textareaForm.reset();
    this.display = false;
  }

}
