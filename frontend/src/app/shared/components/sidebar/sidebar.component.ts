import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/Auth/auth.service";
import {FireAuthService} from "../../../services/Auth/fire-auth.service";
import {BackendData} from "../../models/backend-data";
import {ProfileDataService} from "../../../services/Profile/profile-data.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  path:string;
  staticUrl=BackendData.storageLink;
  avatarPath;
  name;
  constructor(public auth:AuthService,private afAuth:FireAuthService,private avatar:ProfileDataService) { }

  ngOnInit(): void {

    this.avatar.uAvatarChanged.subscribe(res=>{
      this.getProfileAvatarAndName();
    })
    this.getProfileAvatarAndName();


  }

  onLogOut(){
    console.log("hi");
    this.afAuth.logout();
  }

  getProfileAvatarAndName(){
    if (this.auth.isDoctor()){
      this.avatar.getUserAvatar(this.auth.getUser().id).subscribe(res=>{
        if (res.path ==null){
          this.avatarPath=null;
        }
        else {
          this.avatarPath=this.staticUrl+res.path;
        }
        this.name=this.getName(res.name);
      })
    }
    else {
      this.avatar.getPatientAvatar(this.auth.getUser().id).subscribe(res=>{
        if (res.path ==null){
          this.avatarPath=null;
        }
        else {
          this.avatarPath=this.staticUrl+res.path;
        }
        this.name=this.getName(res.name);
        this.name=res.name;
      })
    }
  }

  getName(name:string):string{
    if (name.length>16){
      return name.toString().substr(0,16)+"..";
    }
    else {
      return name.toString().substr(0,16);
    }
  }

}
