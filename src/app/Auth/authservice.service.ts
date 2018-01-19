import { Router } from '@angular/router';
import { LinksService } from './../links.service';
import { AuthGuardService } from './../auth-guard.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http , Headers , RequestOptions} from '@angular/http';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class AuthserviceService {
   authintecated: Boolean = false;
    token = '';
  constructor(private http: Http, private links: LinksService, private router: Router) { }

  signUp(user) {
    console.log(user);

    /* const header = new Headers();
    header.append('Access-Control-Allow-Origin' , '*');
    const options = new RequestOptions({headers: header}); */
    // this.http.post('localhost:3000/user')
    return this.http.post(`${this.links.getlink()}user`, user);
  }

  login(user) {
    return this.http.post(`${this.links.getlink()}user/login`, user);
  }
  savetoken(token) {
    const data = token.toString();
    console.log(data, typeof(data));
    localStorage.setItem('token', data);
    this.authintecated = true;
  }

  checktokenAsync(): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      if (this.authintecated === true) {
        resolve(true);
      }
      // tslint:disable-next-line:one-line
      else {
        if (localStorage.getItem('token')) {
          console.log('there is a token in the local storage', localStorage.getItem('token'));
          const header = new Headers();
          header.append('x-auth', localStorage.getItem('token'));
          console.log(header);
          this.http.get(this.links.getlink() + 'user/check', { headers: header}).subscribe((data) => {
            console.log(data);
            this.authintecated = true;
            this.token = localStorage.getItem('token');
            resolve(true);
          }, (err) => {
            console.log(err);
            localStorage.clear();
            this.authintecated = false;
            reject(false);
          });
        }
        // tslint:disable-next-line:one-line
        else {
          reject(false);
        }
      }
    });
  }
   isAuthenticated() {
      return localStorage.getItem('token') ? true : false;
    /* return new Promise((resolve, reject) => {
      if (this.authintecated === true) {
         resolve();
      }
      // tslint:disable-next-line:one-line
      else {
        if (localStorage.getItem('token')) {
          console.log('there is a token in the local storage', localStorage.getItem('token'));
          const header = new Headers();
          header.append('x-auth', JSON.parse(localStorage.getItem('token')));
          console.log(header);
          this.http.get('http://localhost:3000/user/check', { headers: header}).subscribe((data) => {
            console.log(data);
            this.authintecated = true;
            this.token = localStorage.getItem('token');
             Promise.resolve();
          }, (err) => {
            console.log(err);
            localStorage.clear();
            this.authintecated = false;
             Promise.reject('login required');
          });
        }
        // tslint:disable-next-line:one-line
        else {
          reject();
        }
      }
    }); */
    /* if (localStorage.getItem('token')) {
      return true;
    }
    else return false;
 */
      /* const x =  this.checktokenAsync();
      console.log(x); */
     /*const check = new Promise((resolve, reject) => {
      if ( this.authintecated === false) {
        if (localStorage.getItem('token')) {
          const header = new Headers();
          header.append('x-auth', this.getToken());
          console.log(header);
          this.http.get('http://localhost:3000/user/check', { headers: header}).subscribe((data) => {
            console.log(data);
            this.authintecated = true;
            resolve();
          }, (err) => {
            console.log(err);
            reject();
            localStorage.clear();
          });
        }
        else {
          reject();
        }
      }
      return check;
    });*/
      /*if (this.authintecated === true){
       return true;
    }
    // tslint:disable-next-line:one-line
    else {
      if (localStorage.getItem('token')) {
        const check = new Promise((resolve , reject) => {
            const header = new Headers();
            header.append('x-auth', this.getToken());
            console.log(header);
            this.http.get('http://localhost:3000/user/check', { headers: header}).subscribe((data) => {
              console.log(data);
              this.authintecated = true;
              this.token = localStorage.getItem('token');
              return Promise.resolve(true);
            }, (err) => {
              console.log(err);
              localStorage.clear();
              this.authintecated = false;
              return Promise.reject(false);
            });
        });
        console.log(check);
        return check;
      }
      else {
        this.authintecated = false;
        return false;
      }
    } ;
    /* const val =  this.checktokenAsync().then((res) => {
      console.log('from the Async fun',res);
      return true;
    }, (err) => {
      console.log('from the Async fun err',err);
      return false;
    });
    console.log(val);
    return val; */
   /*  const myObservable = Observable.create((observer: Observer) => {
      if (this.authintecated === true){
        observer.next(true);
      }
      else {
        if (localStorage.getItem('token')){
            const check = new Promise((resolve , reject) => {
            const header = new Headers();
            header.append('x-auth', this.getToken());
            console.log(header);
            this.http.get('http://localhost:3000/user/check', { headers: header}).subscribe((data) => {
              console.log(data);
              this.authintecated = true;
              this.token = localStorage.getItem('token');
              Promise.resolve(true);
              observer.next(true);
            }, (err) => {
              console.log(err);
              localStorage.clear();
              this.authintecated = false;
              observer.error(false);
              Promise.reject(false);
            });
          });
        }else {
          observer.error(false);
        }

      }
    });
    return myObservable.subscribe((res)=>{
      return true;
    },(err)=>{
      return false;
    }); */
   }
   checkfortoken() {
     return this.http.get(`${this.links.getlink()}user/check`, { headers: this.getheader()});
   }
  getToken() {
    return localStorage.getItem('token');
  }
  getheader() {
    const header = new Headers();
    header.append('x-auth', localStorage.getItem('token'));
    return header;
  }
  logout() {
    this.http.delete(`${this.links.getlink()}user/logout`, { headers: this.getheader()}).subscribe((res)=>{
      console.log(res);
      this.authintecated = false;
      localStorage.clear();
      this.router.navigate(['/']);
    }, (err) => {
      console.log(err);
    });
  }
}

