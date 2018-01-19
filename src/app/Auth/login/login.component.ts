import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private Auth: AuthserviceService, private Router: Router) { }
  loading = false;
  err = false;
  connectionerr = false;
  ngOnInit() {
    if (localStorage.getItem('token') != null) {
        this.Router.navigate(['/profile']);
    }
    /* this.Auth.isAuthenticated().then((res) => {
      this.Router.navigate(['/profile']);
    }); */
  }

  login(form: NgForm) {
    this.loading = true;
    this.err = false;
    this.connectionerr = false;
    const user = {
      email : form.value.email,
     password: form.value.password
    };
     this.Auth.login(user).subscribe((res: Response) => {
      const data = res.json();
      this.Auth.savetoken(data.token);
      this.Router.navigate(['/profile']);
     }, (err) => {
      
      this.loading = false;
      if (err.status === 400) {
        this.err = true;
      }
      else{
        this.connectionerr = true;
      }
     });
  }

}
