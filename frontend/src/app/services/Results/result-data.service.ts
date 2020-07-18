import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, pipe} from "rxjs";
import {Doctor} from "../../shared/models/doctor";
import {BackendData} from "../../shared/models/backend-data";
import {map} from "rxjs/operators";
import {Role} from "../../shared/models/role";

@Injectable({
  providedIn: 'root'
})
export class ResultDataService {




  constructor(private http:HttpClient) { }

  getDefault(name,type,specialization,paginator):Observable<any>{
    return this.http.post<any>(BackendData.backendApiUrl+"get/results/default",{
      name:name,
      type:type,
      specialization:specialization,
      paginator:paginator
    })
      .pipe(map((res:any)=>{
        let doctorsArray=[];
        let count=res.count;
        res.data.forEach((obj:Doctor)=>{
          let d=new Doctor();
          d.deserialize(obj);
          doctorsArray.push(d);
        });
        let data={
          "count":count,
          "doctors":doctorsArray
        };
        return data;
      }));
  }
}
