import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Specialization} from "../../shared/models/specialization";
import {BackendData} from "../../shared/models/backend-data";
import {map} from "rxjs/operators";
import {Role} from "../../shared/models/role";

@Injectable({
  providedIn: 'root'
})
export class HomeDataService {

  specializations:Specialization[]=[];
  rolesArray:Role[]=[];

  constructor(private http:HttpClient) { }

  getSpecializations():Observable<Specialization[]>{
    if (this.specializations.length<=0){
      return this.http.get<Specialization[]>(BackendData.backendApiUrl+'get/specializations')
        .pipe(map((res:any)=>{
          res.forEach(obj=>{
            let x=new Specialization();
            x.deserialize(obj);
            this.specializations.push(x);
          })
          return this.specializations;
        }));
    }
  }

  getTypes():Observable<Role[]>{
    if (this.specializations.length<=0){
      return this.http.get<Role[]>(BackendData.backendApiUrl+'get/roles')
        .pipe(map((res:any)=>{
          res.forEach(obj=>{
            let x=new Role();
            x.deserialize(obj);
            this.rolesArray.push(x);
          })
          return this.rolesArray;
        }));
    }
  }

  getData(){
    return this.specializations;
  }
}
