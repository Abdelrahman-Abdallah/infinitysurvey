import { LinksService } from './../links.service';
import { Router } from '@angular/router';
import { AuthserviceService } from './../Auth/authservice.service';
import { Http, Headers , RequestOptions} from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SurveydataService {
  id = '';
  survey= '';
  updatesurve = new EventEmitter();
  display = new EventEmitter();

  constructor(private Auth: AuthserviceService, private http: Http , private router: Router, private links: LinksService) { }

  setsurveyid(id) {
    this.id = id;
  }

  refreshsurvey() {
    this.getSurvydata(this.id);
  }

  getSurvydata(id) {
    this.id = id;
    const header = new Headers();
    header.append('x-auth', localStorage.getItem('token'));

    this.http.get(`${this.links.getlink()}survey/${id}`, {headers: header}).map(res => res.json()).subscribe((res) => {
      console.log(res);
      console.log('sucess');
      this.survey = res;
      this.updatesurve.emit();
      this.display.emit();
    }, (err) => {
      console.error('failde');
      console.log(err);
      this.router.navigate(['/not-found']);
    });
  }

  updateSurveydata(obj) {
    const header = new Headers();
    header.append('x-auth', localStorage.getItem('token'));
   return this.http.patch(`${this.links.getlink()}survey/` + this.id, obj, {headers: header}).map(res => res.json());
  }
}
