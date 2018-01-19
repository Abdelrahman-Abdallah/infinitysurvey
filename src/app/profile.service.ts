import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { AuthserviceService } from './Auth/authservice.service';
import { LinksService } from './links.service';
import { Observable } from 'Rxjs/Observable';

@Injectable()
export class ProfileService {

  userData: any = '';
  userSurveys: any = '';
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

  }
  refreshUserSurveys() {

  }

  UserLogout(){
    this.Auth.logout();
  }

}
