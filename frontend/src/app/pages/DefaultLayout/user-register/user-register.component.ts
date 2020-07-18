import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/Auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FireAuthService} from "../../../services/Auth/fire-auth.service";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  name;
  email;
  password;
  price_per_hour;
  phone_num;
  msg;
  err;

  constructor(private auth:AuthService,private snackBar:MatSnackBar,
              private fire:FireAuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    let formData=new FormData();
    formData.append('name',this.name);
    formData.append('email',this.email)
    formData.append('password',this.password)
    formData.append('phone_num',this.phone_num)
    formData.append('price_per_hour',this.price_per_hour)
    formData.append('role_id',"1");
    formData.append('status_id',"1");
    this.auth.userRegister(formData).subscribe(response=>{
      if (response.msg){
        this.fire.createUserWithEmailAndPassword(this.email,this.password).then(res=>{
          this.fire.signOut();
        })

        this.msg=response.msg;
        this.snackBar.open(this.msg,'Ok',{verticalPosition:"bottom",horizontalPosition:"right",duration:4000})
      }
      else {
        this.msg= "Unknown error occurred";
        this.snackBar.open(this.msg,'Ok',{verticalPosition:"bottom",horizontalPosition:"right",duration:4000})
      }
    })

  }
}
