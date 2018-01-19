import { Http } from '@angular/http';
import { AuthserviceService } from './Auth/authservice.service';
import { Injectable } from '@angular/core';
import { CanActivate , Router , ActivatedRouteSnapshot , RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { AuthGuardService } from './auth-guard.service';


@Injectable()
export class LoginGuardService implements CanActivate {
 
  constructor(private authguard: AuthGuardService,private router: Router ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>| Promise<boolean> | boolean {
   
    /* if (this.Auth.isAuthenticated()) {
      return true;
    }
    else return false; */
     if (localStorage.getItem('token')) {
        this.router.navigate(['/profile']);
        return false;
    }
    else { return true; }
  }

}
