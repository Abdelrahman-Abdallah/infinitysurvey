import { SurveydataService } from './../surveydata.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  surveys: any = '';
  constructor(private surveydataService: SurveydataService) { }

  ngOnInit() {
    this.surveys  = this.surveydataService.survey;
    this.surveydataService.updatesurve.subscribe(() => {
      this.surveys = this.surveydataService.survey;
    });
  }

}
