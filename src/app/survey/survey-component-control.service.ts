import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class SurveyComponentControlService {

  question = {
    '_id' : '5a1a7b1ee2ff1615549bdc12',
    'title' : 'first title',
    'expireDate':Number,
    'questions' : [],
    'database' : [],
    'restricted' : true,
    '__v' : 0
};
  radiobutton = new EventEmitter();
  databaseProcessing = new EventEmitter();
  radiobuttonToEdit = new EventEmitter();
  CheckboxToEdit = new EventEmitter();
  textareaToEdit = new EventEmitter();
  textarea = new EventEmitter();
  checkboxInput = new EventEmitter();
  sendQuestionEvent = new EventEmitter();

  constructor() { }

  showRadio() {
    this.radiobutton.emit();
  }
  showDataBaseProcessing() {
    
    this.databaseProcessing.emit();
  }
  showRadioToEdit(questionValue,inexOfEditArray){
    this.radiobuttonToEdit.emit({questionValue,inexOfEditArray});
  }
  showCheckboxToEdit(questionValue,inexOfEditArray){
    this.CheckboxToEdit.emit({questionValue,inexOfEditArray});
  }
  showTextareaToEdit(questionValue,inexOfEditArray){
    this.textareaToEdit.emit({questionValue,inexOfEditArray});
  }
  addQuestion(Question) {
    this.question.questions.push(Question);
    console.log(this.question);
    this.sendQuestionEvent.emit();
  }
  showCheckbox()
  {
    this.checkboxInput.emit();
  }
  showTextArea() {
    this.textarea.emit();
  }
}
