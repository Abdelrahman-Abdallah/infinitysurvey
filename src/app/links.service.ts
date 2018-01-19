import { Injectable } from '@angular/core';

@Injectable()
export class LinksService {
  link = 'http://localhost:3000/api/';
  //link = 'https://infinitysurvey.herokuapp.com/api/';
  constructor() { }


  getlink () {
    return this.link;
  }

}
