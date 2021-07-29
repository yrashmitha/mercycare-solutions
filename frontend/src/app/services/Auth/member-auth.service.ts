import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";
import {Patient} from "../../shared/models/patient";
import {BackendData} from "../../shared/models/backend-data";
import {map} from "rxjs/operators";
import {MemberPatient} from "../../shared/models/member-patient";

@Injectable({
  providedIn: 'root'
})
export class MemberAuthService {

  constructor(private http:HttpClient,private snack:MatSnackBar) { }

  addMember(patient:FormData):Observable<Patient>{
    return this.http.post<Patient>(BackendData.backendApiUrl+'member/register',patient);

  }

  getMyMembers():Observable<MemberPatient[]>{
    return this.http.get<MemberPatient[]>(BackendData.backendApiUrl+'member/getall')
      .pipe(map((res:any)=>{
        let arr=[];
        res.forEach(obj=>{
          let p=new MemberPatient();
          p.deserialize(obj);
          arr.push(p);
        });
        return arr;
      }));

  }

  updateMemberDetails(form:FormData,memberId){
    console.log(form)
    return this.http.post(BackendData.backendApiUrl+'member/update/'+memberId,form);
  }
  openSnackBar(msg) {
    this.snack.open(msg, 'Ok', {
      verticalPosition: "bottom",
      horizontalPosition: "right",
      duration: 4000
    })
  }


  deleteMember(id: number) {
    return this.http.delete(BackendData.backendApiUrl+'member/'+id);
  }
}
