import { Injectable } from '@angular/core';
import {AuthService} from "../Auth/auth.service";
import {CanActivate, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DoctorGuardService implements CanActivate{

  constructor(private auth:AuthService,private router:Router) { }

  canActivate(): boolean{
    if (this.auth.isDoctor()){
      return true;
    }
    else {
      this.router.navigate(['unauthorized']);
      return false;
    }
  }
}
