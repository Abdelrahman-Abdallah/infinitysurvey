import { Component, OnInit , AfterViewInit } from '@angular/core';
import { SurveyComponentControlService } from './survey-component-control.service';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit , AfterViewInit {

  Questions = [];
  tempNextButton = true;
  displaySubmitButton = false;
  // var x = Math.random() < 0.5 ? -1 : 1;
  nextButton= false;
  // test = new Date().getTime();
  
  constructor(private componetControl: SurveyComponentControlService) { 
    // console.log(this.test);
    
    
  }

  ngAfterViewInit() {
    $('#navbar').click(function(){
      console.log('hello from the navbar');
    });

    var height = $(window).height();
    $(window).on('resize', function(){
       if ( $(this).height() !== height) {
          height = $(this).height();
   //        console.log(height);
       }
       $('#surveycontent').css({height: height});
    });
    $('#toggle').click(function(){
      $('#navbar').toggle(250);
      console.log('toogleclicked');
    });
    
  }
  ngOnInit() {
    
    /* this.componetControl.sendQuestionEvent.subscribe( (question) => {
      this.Questions.push(question);
    }); */
    
    this.componetControl.sendQuestionEvent.subscribe(() => {
      this.Questions = this.componetControl.question.questions;
      console.log("Array Length : ",this.Questions.length);
      this.nextButton= this.Questions.length > 0 ? true : false;
      console.log(this.Questions);
    });
  }
  testFunc(){

  }
  removeQuestion(i)
  {
    
    console.log("remove was here and passing : " , i);
    console.log(this.Questions)
    this.Questions.splice(i,1);
    this.nextButton= this.Questions.length > 0 ? true : false;
    // this.componetControl.question.splice(i,1);
  }
  questionUp(i){
    var x;
    x = this.Questions[i];
    this.Questions[i] = this.Questions[i-1];
    this.Questions[i-1] = x;
  }
  questionDown(i){
    var y;
    y = this.Questions[i];
    this.Questions[i] = this.Questions[i+1];
    this.Questions[i+1] = y;
  }
  editTextareaQuestion(i){
    this.showTextareaToEdit(this.Questions[i],i);
  }
  editRadioQuestion(i){
    console.log(this.Questions[i]);
    this.showRadioToEdit(this.Questions[i],i);
  }
  editCheckboxQuestion(i){
    console.log(this.Questions[i]);
    this.showCheckboxToEdit(this.Questions[i],i);
  }
  showRadio() {
    this.componetControl.showRadio();
  }
  showDataBaseProcessing(){
    
    this.componetControl.showDataBaseProcessing();
  }
  showRadioToEdit(questionValue,inexOfEditArray) {
    this.componetControl.showRadioToEdit(questionValue,inexOfEditArray);
  }
  showTextareaToEdit(questionValue,inexOfEditArray){
    this.componetControl.showTextareaToEdit(questionValue,inexOfEditArray);
  }
  showCheckbox() {
    this.componetControl.showCheckbox();
  }
  showCheckboxToEdit(questionValue,inexOfEditArray) {
    this.componetControl.showCheckboxToEdit(questionValue,inexOfEditArray);
  }
  showTextArea() {
    this.componetControl.showTextArea();
  }
}
