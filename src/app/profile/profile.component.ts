import { Router } from '@angular/router';
import { AuthserviceService } from './../Auth/authservice.service';
import { Http, Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';
import { LinksService } from '../links.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = '';
  Surveys: Array <any> = [];
  constructor(private router: Router, private UserService: ProfileService) { }

  ngOnInit() {
    this.UserService.getUserData().subscribe((res) => {
      this.UserService.userData = res;
      this.user = res;
    }, (err) => {
      console.log(err);
    });

  }

  addsurvey() {
    this.router.navigate(['/addsurvey']);
  }
  logout() {
    this.UserService.UserLogout();
  }

}
