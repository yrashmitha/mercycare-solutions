import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {Patient} from "../../shared/models/patient";
import {BackendData} from "../../shared/models/backend-data";
import {Appointment} from "../../shared/models/appointment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userPath;
  isLogged = new  BehaviorSubject<boolean>(false);



  loggedInPatient:Patient;

  constructor(private http:HttpClient) { }

  register(patient:FormData):Observable<Patient>{
    return this.http.post<Patient>(BackendData.backendApiUrl+'patient/register',patient);

  }

  login(email,password):Observable<any>{
    return this.http.post<any>(BackendData.backendApiUrl+'patient/login',{
      email:email,
      password:password
    })
  }

  doctorLogin(email,password):Observable<any>{
    return this.http.post<any>(BackendData.backendApiUrl+'user/login',{
      email:email,
      password:password
    }).pipe(tap((res)=>{
      this.userPath=res.path;
      console.log(this.userPath)
    }))
  }

  otpVerify(number,code):Observable<any>{
    return this.http.post(BackendData.backendApiUrl+'patient/verify',{
      phone_number:number,
      code:code
    })
  }

  getToken(){
    return localStorage.getItem('mercy');
  }

  isLoggedInUser(){
    if (!!localStorage.getItem('mercy')){
      this.isLogged.next(true);
    }
    return !!localStorage.getItem('mercy');
  }

  getUser(){
    return JSON.parse(atob(localStorage.getItem('mercy').split('.')[1]));
  }

  check():Observable<any> {
    return this.http.get<any>(BackendData.backendApiUrl+'patient/me');
  }

  userRegister(user:FormData):Observable<any>{
    return this.http.post<any>(BackendData.backendApiUrl+'user/register',user);
  }

  isDoctor(){
    if (this.isLoggedInUser()){
      if (this.getUser().role){
        return true;
      }
    } else return false;
  }

  logOut(){
    localStorage.removeItem('mercy');
    this.isLogged.next(false);
  }

}
