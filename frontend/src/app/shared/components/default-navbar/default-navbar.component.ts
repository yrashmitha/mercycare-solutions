import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/Auth/auth.service";

@Component({
  selector: 'app-default-navbar',
  templateUrl: './default-navbar.component.html',
  styleUrls: ['./default-navbar.component.css']
})
export class DefaultNavbarComponent implements OnInit {

  loggedIn:boolean = false;

  constructor(public auth:AuthService) { }

  ngOnInit(): void {
    this.auth.isLogged.subscribe(val=>{
      this.loggedIn=val;
    })

    this.loggedIn = this.auth.isLogged.getValue();
  }

}
