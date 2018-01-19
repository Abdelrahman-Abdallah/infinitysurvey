import { Http } from '@angular/http';
import { AuthserviceService } from './Auth/authservice.service';
import { Injectable } from '@angular/core';
import { CanActivate , Router , ActivatedRouteSnapshot , RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


@Injectable()
export class AuthGuardService implements CanActivate {
  x: any;
  authenticated = false;
  constructor(private router: Router , private Auth: AuthserviceService, private http: Http ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>| Promise<boolean> | boolean {
    /* if (!this.Auth.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
    // tslint:disable-next-line:curly
    return true; */
     /* this.Auth.isAuthenticated().then((res) => {
      this.x = true;
    }, (err) => {
      this.x = false;
      this.router.navigate(['/login']);
    });
    return this.x; */


    if (this.authenticated === true) {
      return true;
    }
    else {
      if (localStorage.getItem('token')) {
      return this.Auth.checkfortoken().map(res => {
        if (res) {
          console.log(res);
        this.authenticated = true;
        this.Auth.authintecated = true;
        return true;
        }
        this.Auth.logout();
        localStorage.clear();
        this.router.navigate(['/login']);
        return false;
      }).catch((): Observable<boolean> => {
        this.Auth.logout();
        this.router.navigate(['/login']);
        return Observable.of(false);
      });
    }
    else {
      this.Auth.logout();
    }
  }
    /* if (this.Auth.isAuthenticated()) {
      return true;
    }
    else return false; */
  }

}
