import { SurveydataService } from './../surveydata.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  surveys: any = '';
  constructor(private surveydataService: SurveydataService) { }

  ngOnInit() {
    this.surveys  = this.surveydataService.survey;
    this.surveydataService.updatesurve.subscribe(() => {
      this.surveys = this.surveydataService.survey;
    });
  }

}
