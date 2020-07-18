import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "../Auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(private auth:AuthService,private router:Router) { }

  canActivate(): boolean{
    if (this.auth.isLoggedInUser()){
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
