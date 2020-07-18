import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/Auth/auth.service";

import {MatProgressButtonOptions} from "mat-progress-buttons";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";

import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {FireAuthService} from "../../../services/Auth/fire-auth.service";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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

  constructor(private patientAuth: AuthService,
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
    this.patientAuth.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(res => {
          this.handleLoginResponse(res);
        }, err => {
          this.handleError(err);
        }
      )
  }

  handleLoginResponse(response) {

    if (response.access_token) {
      localStorage.setItem('mercy', response.access_token);
      //loggin in to firebase
      this.fire.loginWithEmailandPassword(this.loginForm.value.email, this.loginForm.value.password).then(()=>{
        this.msg = 'Logged in Successfully';
        // this.router.navigate(['dashboard']);
        this.snackBar.open(this.msg, 'Ok', {verticalPosition: "bottom", horizontalPosition: "right", duration: 2000})
        this.btnOpts.active = false;
      }).catch(err=>{
        this.snackBar.open(err, 'Ok', {verticalPosition: "bottom", horizontalPosition: "right", duration: 2000})
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
  }

  logout(){
    this.fire.signOut().then(()=>{
      console.log("outz")
    })
  }



  onLoginSuccess(){

  }
}
