import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";
import {Patient} from "../../shared/models/patient";
import {BackendData} from "../../shared/models/backend-data";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MemberAuthService {

  constructor(private http:HttpClient,private snack:MatSnackBar) { }

  addMember(patient:FormData):Observable<Patient>{
    return this.http.post<Patient>(BackendData.backendApiUrl+'member/register',patient);

  }

  getMyMembers():Observable<Patient[]>{
    return this.http.get<Patient[]>(BackendData.backendApiUrl+'member/getall')
      .pipe(map((res:any)=>{
        let arr=[];
        res.forEach(obj=>{
          let p=new Patient();
          p.deserialize(obj);
          arr.push(p);
        });
        return arr;
      }));

  }

  openSnackBar(msg) {
    this.snack.open(msg, 'Ok', {
      verticalPosition: "bottom",
      horizontalPosition: "right",
      duration: 4000
    })
  }


}
