import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

import { AuthserviceService } from './Auth/authservice.service';
import { LinksService } from './links.service';
import { Observable } from 'Rxjs/Observable';

@Injectable()
export class ProfileService {

  userData: any = '';
  userSurveys: any = '';

  data = new EventEmitter();
  constructor(private _http: Http, private Auth: AuthserviceService, private links: LinksService) { }


  getUserSurveys() {
    return this._http.get(this.links.getlink() + 'survey', {headers: this.Auth.getheader()}).map((res) => {
      return res.json();
    });
  }
  getUserData() {
    return this._http.get(this.links.getlink() + 'user', {headers: this.Auth.getheader()}).map((res) => {
      return res.json();
    });
  }

  refreshUserData() {
    this._http.get(this.links.getlink() + 'survey', {headers: this.Auth.getheader()}).map((res) => {
      return res.json();
    }).subscribe((res) => {
      this.userData = res;
      setTimeout(() => {
        this.data.emit(res);
      },250);
     
    }, (err) => console.log(err));
  }
  refreshUserSurveys() {

  }

  updateUserData(obj) {
    return this._http.patch(this.links.getlink() + 'user/userdata', obj, {headers: this.Auth.getheader()}).map((res) => res.json());
  }

  UserLogout(){
    this.Auth.logout();
  }

}
