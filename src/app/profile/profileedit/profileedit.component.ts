import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-profileedit',
  templateUrl: './profileedit.component.html',
  styleUrls: ['./profileedit.component.css']
})
export class ProfileeditComponent implements OnInit {
  user: any= '';
  dataloading = false;
  constructor(private UserService: ProfileService) { }

  ngOnInit() {
    this.user =  this.UserService.userData;
    if (this.user === '') {
      console.log('getting user data');
    this.UserService.getUserData().subscribe((res) => {
      this.UserService.userData = res;
      this.user = res;
    }, (err) => {
      console.log(err);
    });

  }
}

changeuserdata(form: NgForm) {
  const data = {
    firstname: form.value.firstname,
    lastname: form.value.lastname,
    email: form.value.email,
  };
  console.log(data);
  console.log(form);

  this.UserService.updateUserData(data).subscribe((res) => {
    console.log(res);
    this.UserService.refreshUserData();
  });
}

changepassword(form: NgForm){

}

}
