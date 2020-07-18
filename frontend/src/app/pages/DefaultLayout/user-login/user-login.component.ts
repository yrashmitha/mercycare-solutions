import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {MatProgressButtonOptions} from "mat-progress-buttons";
import {AuthService} from "../../../services/Auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {FireAuthService} from "../../../services/Auth/fire-auth.service";
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;
  msg;
  disabled = false;
  user;
  itemDoc:AngularFirestoreDocument;
  item:any;

  btnOpts: MatProgressButtonOptions = {
    active: false,
    text: 'Login',
    spinnerSize: 19,
    raised: true,
    stroked: false,
    flat: false,
    fab: false,
    buttonColor: 'accent',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
    customClass: 'some-class',
    // add an icon to the button
    buttonIcon: {
      fontSet: 'fa',
      fontIcon: 'fa-user',
      inline: true
    }
  };

  constructor(private userAuth: AuthService,
              private snackBar: MatSnackBar
    ,private router: Router,
              private fire:FireAuthService,
              private afs:AngularFirestore,
              public afAuth:AngularFireAuth,
              private authService:AuthService) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      password: new FormControl("", [
        Validators.required,
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.email
      ]),
    });

    this.afAuth.authState.subscribe(user=>{
      if (user){
        console.log(user.uid)
      }
      else {
        console.log("no user")
      }
    })

  }

  onSubmit() {

    this.btnOpts.active = true;
    this.disabled = true;
    this.userAuth.doctorLogin(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(res => {
          this.handleLoginResponse(res);
        }, err => {
          this.handleError(err);
        }
      )
  }

  handleLoginResponse(response) {

    if (response.access_token) {

      console.log();
      //loggin in to firebase
      this.fire.loginWithEmailandPassword(this.loginForm.value.email, this.loginForm.value.password).then(()=>{
        this.msg = 'Logged in Successfully';
        localStorage.setItem('mercy', response.access_token);
        this.router.navigate(['dashboard']);
        this.snackBar.open(this.msg, 'Ok', {verticalPosition: "bottom", horizontalPosition: "right", duration: 2000})
        this.btnOpts.active = false;
      }).catch(err=>{
        this.btnOpts.active = false;
        console.log(err)
      });


    } else {
      this.btnOpts.active = false;
      this.msg = response.msg;
      if (response.status == 0) {
        this.snackBar.open(this.msg, 'Ok', {verticalPosition: "bottom", horizontalPosition: "right"})
      }
      if (response.status == 1) {
        this.btnOpts.active = false;
        let ref = this.snackBar.open(this.msg, 'Ok', {verticalPosition: "bottom", horizontalPosition: "right"});
        ref.onAction().subscribe(() => {
          this.router.navigate(['verify'], {
            queryParams: {
              number: response.number
            }
          })
        })
      }
    }
  }

  handleError(err) {
    this.btnOpts.active = false;
    this.msg = err.statusText;
    this.snackBar.open(this.msg, 'Ok', {verticalPosition: "bottom", horizontalPosition: "right", duration: 2000})
  }

  // check() {
  //   this.patientAuth.check().subscribe(res => {
  //     console.log(res)
  //   })
  // }
  check() {
    this.itemDoc = this.afs.doc<any>('users/MSTnZ9I0QZF1V6Qw0Rxm');
    this.item = this.itemDoc.valueChanges();

    console.log(this.fire.doSomething())
  }

  logout(){
    this.fire.signOut().then(()=>{
      console.log("out")
    })
  }



  onLoginSuccess(){

  }

}
