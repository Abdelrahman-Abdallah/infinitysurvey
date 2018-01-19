import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../Auth/authservice.service';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.css']
})
export class WelcomepageComponent implements OnInit {

  constructor(public Auth: AuthserviceService) { }

  ngOnInit() {
  }

}
