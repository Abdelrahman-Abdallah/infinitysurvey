import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-profilehome',
  templateUrl: './profilehome.component.html',
  styleUrls: ['./profilehome.component.css']
})
export class ProfilehomeComponent implements OnInit {
  Surveys: any = [];
  loading = true;
  constructor(private UserService: ProfileService) { }

  ngOnInit() {
    this.UserService.getUserSurveys().subscribe((res) => {
      this.UserService.userSurveys = res;
      this.Surveys = res;
      console.log(res,this.Surveys);
      this.loading = false;
      console.log('survey length', this.Surveys.length);
      console.log(this.Surveys);
    }, (err) => {});

  }

}
