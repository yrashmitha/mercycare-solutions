import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/Auth/auth.service";
import {FireAuthService} from "../../../services/Auth/fire-auth.service";
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
  selector: 'app-user-header-nav',
  templateUrl: './user-header-nav.component.html',
  styleUrls: ['./user-header-nav.component.css']
})
export class UserHeaderNavComponent implements OnInit {

  constructor(private auth:AuthService,private afAuth:AngularFireAuth,private fireAuth:FireAuthService) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user=>{
      console.log(user);
    },error1 =>{
      console.log(error1)
    })
  }



}
