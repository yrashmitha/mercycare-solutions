import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Appointment} from "../../shared/models/appointment";
import {BackendData} from "../../shared/models/backend-data";
import {map, tap} from "rxjs/operators";
import {FireAuthService} from "../Auth/fire-auth.service";
import {Transport} from "../../shared/models/transport";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {MatSnackBar} from "@angular/material/snack-bar";
export interface Points {
  lat:number,
  lng:number
}


@Injectable({
  providedIn: 'root'
})



export class AppointmentDataService {


  private appointmentsCollection: AngularFirestoreCollection<any>;

  transportTypes:Transport[]=[];
  app:Appointment;


  constructor(private http:HttpClient,private fireAuth:FireAuthService,private afs:AngularFirestore,private snack:MatSnackBar) {
    this.appointmentsCollection = afs.collection<any>('appointments');
  }


  headers=new HttpHeaders().set("Access-Control-Allow-Headers","*");

  createAppointment(patientId,patientFireUid,userId,address,extraMessage,patientCoords):Observable<Appointment>{
    let appointment=new Appointment();
    appointment.address=address;
    appointment.extraMessage=extraMessage;
    appointment.patientGeoCoords=patientCoords;
    appointment.userId=userId;
    appointment.patientId=patientId;
    appointment.firePatientUid=patientFireUid;
    const x=appointment.serialize();

    return this.http.post<Appointment>(BackendData.backendApiUrl+"app/create",x)
      .pipe(map((res:any)=>{
        let ap=new Appointment();
        ap.deserialize(res.appointment);
        return ap;
      }));
  }

  getAllPatientAppointments(patientId):Observable<Appointment[]>{
    return this.http.get<Appointment[]>(BackendData.backendApiUrl+"app/getall/"+patientId)
      .pipe(map((res:any)=>{
        let appointmentArray=[];
        res.forEach((obj:Appointment)=>{
          let d=new Appointment();
          d.deserialize(obj);
          appointmentArray.push(d);
        });
        return appointmentArray;
      }));
  }

  getAllUserAppointments(userId):Observable<Appointment[]>{
    return this.http.get<Appointment[]>(BackendData.backendApiUrl+"app/getall/d/"+userId)
      .pipe(map((res:any)=>{
        let appointmentArray=[];
        res.forEach((obj:Appointment)=>{
          let d=new Appointment();
          d.deserialize(obj);
          appointmentArray.push(d);
        });
        return appointmentArray;
      }));
  }

  getAppointmentData(appointmentId):Observable<Appointment>{
    return this.http.get<Appointment>(BackendData.backendApiUrl+"app/getappointment/"+appointmentId)
      .pipe(map((res)=>{
        let appointment=new Appointment();
        appointment.deserialize(res[0]);
        this.app=appointment;
        return this.app;
      }))
  }

  calculateDistance(url):Observable<any>{

    return this.http.get(url,{headers:this.headers})
      .pipe(map((res:any)=>{
        return res.rows[0].elements[0];
      }));
  }

  getTransports(userId):Observable<Transport[]>{
    return this.http.get<Transport[]>(BackendData.backendApiUrl+'app/gettransport/'+userId)
      .pipe(map((res:any)=>{
        res.forEach(obj=>{
          let x=new Transport();
          x.deserialize(obj);
          this.transportTypes.push(x);
        })
        return this.transportTypes;
      }));
  }

  approveAppointment(formData:FormData,appointmentId):Observable<any>{
    return this.http.post(BackendData.backendApiUrl+'app/approve/'+appointmentId,formData);
  }

  trackingStart(apppointmentId){
    return this.http.get(BackendData.backendApiUrl+'app/starttracking/'+apppointmentId)
  }

  trackingStop(appointmentId){
    return this.http.get(BackendData.backendApiUrl+'app/stoptracking/'+appointmentId)
  }

  addAppointmentToFireStore(fireUserId,firePatientId,userGeoCoords,patientGeoCoords,appointmentId) {

    let obj={
      user_id:fireUserId,
      patient_id:firePatientId,
      user_coords:JSON.parse(userGeoCoords),
      patient_coords:JSON.parse(patientGeoCoords)
    };

    console.log(obj);
    let res=this.appointmentsCollection.doc(appointmentId).set(obj).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    });
    if (res){
      console.log(res);
      console.log("record added to fb")
    }
  }

  updateDoctorsLocation(appointmentId,lat,lng){
   let app = this.afs.doc<any>('appointments/'+appointmentId);
    app.update({
      "user_coords.lat": lat,
      "user_coords.long":lng
    }).then(res=>{
      console.log(res+" updated");
      let obj={
        lat:lat,
        lng:lng
      };



    }).catch(err=>{
      console.log('catch called when updating '+err)
    });
  }

  patientMarkComplete(appointmentId){
    return this.http.get(BackendData.backendApiUrl+"app/complete/"+appointmentId);
  }

  userMarkComplete(appointmentId,time){
    return this.http.post(BackendData.backendApiUrl+"app/d/complete/"+appointmentId,{
      time:time
    });
  }

  snackBar(msg){
    this.snack.open(msg,'Ok',{
      duration:4000,
      verticalPosition:"bottom",
      horizontalPosition:"right"
    })
  }

}
