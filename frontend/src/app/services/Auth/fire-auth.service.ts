import { Injectable } from '@angular/core';
import {auth, User} from 'firebase/app';
import {AngularFireAuth} from "@angular/fire/auth";
import {Observable, of} from "rxjs";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {first, switchMap, tap} from "rxjs/operators";
import {error} from "selenium-webdriver";
import {AuthService} from "./auth.service";


@Injectable({
  providedIn: 'root'
})
export class FireAuthService {

  user: any;

  userId:any;

  constructor(private auth:AuthService,private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router,) {
  }



  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credentials = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credentials.user);
  }

  async signOut() {
    this.afAuth.signOut();
    // return this.router.navigate(['/'])
  }

  private updateUserData(user) {
    console.log(user)
    const userRef: AngularFirestoreDocument = this.afs.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      name: user.displayName
    }
    return userRef.set(data, {merge: true})
  }

  login() {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()).then(user => {
      this.user = user;
      console.log(user)
    });
  }

  async logout() {
    this.afAuth.signOut().then(res=>{
      console.log(res +"fire log out");
      this.auth.logOut();
      this.router.navigate(['']);
    }).catch(err=>{
      console.log(err)
    });
    // console.log(this.user);
  }


  async loginWithEmailandPassword(email: string, password: string) {
    var result = await this.afAuth.signInWithEmailAndPassword(email, password).then(user => {
      this.user = user;
      return this.user;
    });


  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    await this.afAuth.createUserWithEmailAndPassword(email, password).then(result => {
      console.log(result)
    }).catch(error => {
      console.log(error)
    })
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first())
  }

  doSomething() {
    this.isLoggedIn().pipe(
      tap(user => {
        if (user) {
          console.log(user)
        } else {
          console.log(user)
        }
      })
    )
      .subscribe()
  }

  currentUser(){
     this.afAuth.authState.subscribe(user=>{
     this.userId=user.uid;
    });
     return this.userId;
  }
}
// mk
