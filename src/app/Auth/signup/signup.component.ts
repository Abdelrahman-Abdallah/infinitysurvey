import { Response } from '@angular/http';
import { AuthserviceService } from './../authservice.service';
import { Component, OnInit , AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, AfterViewInit {

  loading = false;
  err = false;
  connectionerr = false;

  firstname: string;
  lastname: string;
  email: string;
  password: string;
  repassword: string;
  birthdate: string;

  constructor(private Auth: AuthserviceService, private Router: Router) { }

  ngAfterViewInit() {
    /* $('input').hover(function(){
      $(this).css('background-color', 'yellow');
    }); */
  }
  ngOnInit() {
    if (this.Auth.isAuthenticated()) {
      this.Router.navigate(['/profile']);
    }
  }
  signup(form: NgForm) {
    this.loading = true;
    this.err = false;
    this.connectionerr = false;
    const user = {
     firstname: form.value.firstname,
     lastname : form.value.lastname,
     email: form.value.email,
     password : form.value.password,
     birthdate : form.value.birthdate,
    };
    this.Auth.signUp(user).subscribe((data: Response) => {
      console.log(data.json());
      this.Router.navigate(['/']);

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
