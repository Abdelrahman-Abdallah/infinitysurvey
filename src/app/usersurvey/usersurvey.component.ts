import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  } from '@angular/router';
import { SurveydataService } from './surveydata.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-usersurvey',
  templateUrl: './usersurvey.component.html',
  styleUrls: ['./usersurvey.component.css']
})
export class UsersurveyComponent implements OnInit {
  id = '';
  title = '';
  display = false;
  userdata:any = '';
  constructor(private router: ActivatedRoute, private surveydata: SurveydataService, private user: ProfileService) { }

  ngOnInit() {
    console.log(this.user.userData);
    if (!this.user.userData) {
      console.log('getting userdata');
      this.user.getUserData().subscribe((res) => {
        this.userdata = res;
        this.user.userData = res;
      }, (err) => console.log(err));
    }
    else {
      this.userdata = this.user.userData;
    }
    this.id =  this.router.snapshot.params.id;
    console.log(this.id);
    this.surveydata.getSurvydata(this.id);
    this.surveydata.updatesurve.subscribe(() => {
      this.title = this.surveydata.survey['title'];
    });
    this.surveydata.display.subscribe(() => {
      this.display = true;
    });
  }

}
