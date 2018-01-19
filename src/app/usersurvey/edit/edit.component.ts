import { SurveydataService } from './../surveydata.service';
import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  survey: any= '';
  newTitle: any= '';
  titleEdit = false;
  constructor(private surveydataService: SurveydataService) { }

  ngOnInit() {
    this.survey  = this.surveydataService.survey;
    this.surveydataService.updatesurve.subscribe(() => {
      this.survey = this.surveydataService.survey;
    });
  }
  updateTitle() {
    const data = {title: this.newTitle};
    console.log(this.newTitle);
    this.surveydataService.updateSurveydata(data).subscribe((res) => {
      console.log(res);
      this.surveydataService.refreshsurvey();
    }, (err) => {
      console.log(err);
    });
  }

}
