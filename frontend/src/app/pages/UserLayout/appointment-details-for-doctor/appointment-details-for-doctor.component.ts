import {Component, OnInit} from '@angular/core';
import {Appointment} from "../../../shared/models/appointment";
import {ActivatedRoute} from "@angular/router";
import {AppointmentDataService} from "../../../services/Appointment/appointment-data.service";
import {AuthService} from "../../../services/Auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Transport} from "../../../shared/models/transport";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
  selector: 'app-appointment-details-for-doctor',
  templateUrl: './appointment-details-for-doctor.component.html',
  styleUrls: ['./appointment-details-for-doctor.component.css']
})
export class AppointmentDetailsForDoctorComponent implements OnInit {
  appointmentId;
  appointment: Appointment;
  patientGeoCoords;
  distance='N/A';
  duration='N/A';
  price:any="N/A";
  alertClass = "alert alert-dismissible fade show alert-";
  newAlertClass;
  alertMsg ;

  value:any;
  ok:boolean=true;

  approveForm:FormGroup;

  lat = 7.048867;
  lng = 79.909275;

  watchPositionId;
  transportsArr:Transport[];

  calculatedPrice:number;

  userFireUid;

  directionVisible=false;
  deslat;
  deslng;
  public origin: any;
  public destination: any;

  selected=null;
  mylat:number;
  mylng:number;
  myPlace={lat:this.mylat,lng:this.mylng};

  constructor(private route: ActivatedRoute, private appointmentService: AppointmentDataService,
              public auth: AuthService,private http:HttpClient,private snack:MatSnackBar,private afAuth:AngularFireAuth) {
  }

  ngOnInit(): void {
    this.getUserFireUid();
    this.approveForm=new FormGroup({
      type:new FormControl(null,[Validators.required])
    });
    this.getMyCoords();
    this.getAppointmentDetails();
    this.getTransports();
  }

  getUserFireUid(){
    this.afAuth.user.subscribe(res=>{
      this.userFireUid=res.uid;
    });
  }

  getAlertMessage(statusName: string) {
    console.log(statusName.toLowerCase());
    if (statusName.toLowerCase() === 'pending') {

      this.alertMsg = "This appointment is still waiting for your approval. You can contact patient and discuss with him more details.";
      this.newAlertClass = this.alertClass.concat('warning');
      console.log(this.newAlertClass)
    }
    if (statusName.toLowerCase() === 'accepted') {
      console.log('hi');
      this.getDirection();
      this.alertMsg = "Appointment accepted.";
      this.newAlertClass =this.alertClass.concat('success');
    }
    if (statusName.toLowerCase() === 'on going') {
      this.getDirection();
      this.alertMsg = "Appointment is ongoing.";
      this.newAlertClass =this.alertClass.concat('success');
    }
    if (statusName.toLowerCase() === 'completed') {
      this.getDirection();
      this.alertMsg = "This appointment is marked as complete!";
      this.newAlertClass =this.alertClass.concat('success');
    }
  }

  getDirection() {
    // this.origin = {lat: 7.048867, lng: 79.909275};
    this.origin={lat:this.mylat,lng:this.mylng};
    this.destination = {lat: this.patientGeoCoords.lat, lng: this.patientGeoCoords.long};
    this.directionVisible=true;

  }

  getAppointmentDetails() {
    this.appointmentId = this.route.snapshot.paramMap.get('id');
    this.appointmentService.getAppointmentData(this.appointmentId).subscribe(res => {
      this.appointment = res;
      this.patientGeoCoords = JSON.parse(res.patientGeoCoords);
      this.getAlertMessage(this.appointment.appointmentStatusName)
    })

  }

  getDetailsOfTrip(){
    this.getDirection();
    console.log("lat "+this.lat+" lng "+this.lng);
    let url="https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins="+this.mylat+","+this.mylng+
      "&destinations="+this.patientGeoCoords.lat+","+this.patientGeoCoords.long+"6&key=AIzaSyB6zk7dmppRilAba6JSCz_0698mN7GovRQ";
    this.getCalculatedDistanceAndDuration(url);
  }

  getCalculatedDistanceAndDuration(url){
    this.appointmentService.calculateDistance(url).subscribe(res=>{
      console.log(res);
      this.distance=res.distance.text;
      this.duration=res.duration.text;
    });
  }

  getMyCoords(){
    navigator.geolocation.getCurrentPosition(pos=>{
      this.mylat=pos.coords.latitude;
      this.mylng=pos.coords.longitude;

    })
  }

  dragEnd(event){
    console.log(event);
    this.showSnackMessage('Your current location successfully updated!');
    this.mylat=event.coords.lat;
    this.mylng=event.coords.lng;
  }

  showSnackMessage(message:string){
    this.snack.open(message,'Ok',{
      duration:2000,
      verticalPosition:"bottom"
    })
  }

  onApprove(){
    this.ok=true;
    let coords={
      lat:this.mylat,
      long:this.mylng
    };
    if (this.distance.toLowerCase() == 'n/a' || this.duration.toLowerCase() =='n/a'){
      this.showSnackMessage('Click Get Distance and Time Button to calculate required data.')
      this.ok=false;
    }
    if (this.selected ==null) {
      this.showSnackMessage('Select transport method.')
      this.ok=false;
    }
    if (this.ok==true) {
      let distance =parseFloat(this.distance.split(' ',1)[0]);

      let formData=new FormData();
      formData.append('distance',distance.toString());
      formData.append('duration',this.duration);
      formData.append('user_geo_coords',JSON.stringify(coords));
      formData.append('transport_id',this.selected);
      formData.append('user_fire_uid',this.userFireUid);
      this.appointmentService.approveAppointment(formData,this.appointment.appointmentId).subscribe(res=>{
        console.log(res);
        this.appointmentService.addAppointmentToFireStore(this.userFireUid,this.appointment.firePatientUid,JSON.stringify(coords),this.appointment.patientGeoCoords,this.appointment.appointmentId);
       this.getAppointmentDetails();
      })
    }




  }

  getTransports(){
    let userId=this.auth.getUser().id;
    this.appointmentService.getTransports(userId).subscribe(res=>{
      this.transportsArr=res;
    })
  }

  onTrackingStart(){
    console.log("tracking start");
    this.appointmentService.trackingStart(this.appointment.appointmentId).subscribe((res:any)=>{
      console.log(res);
      if (res.status){
        this.showSnackMessage(res.msg);
        this.getAppointmentDetails();
        this.watchPositionId= navigator.geolocation.watchPosition(position=>{
          console.log(position);

          this.appointmentService.updateDoctorsLocation(this.appointmentId,position.coords.latitude,position.coords.longitude)

        },err=>{
          console.log('error!')
        },{
          enableHighAccuracy:true
        })
      }
      else {
        this.showSnackMessage('Error occurred');
      }
    })

  }

  stopTracking(){
    this.appointmentService.trackingStop(this.appointmentId).subscribe((res:any)=>{
      console.log(res);
      if (res.status){
        navigator.geolocation.clearWatch(this.watchPositionId);
        this.showSnackMessage(res.msg);
        this.getAppointmentDetails();
      }
      else {
        this.showSnackMessage('Error occurred');
      }
    })
  }


  setPrice(){
    if (this.value>=0){
      this.price=(this.appointment.pricePerKm *this.appointment.distance)+ (this.appointment.pricePerHour *this.value);
      this.calculatedPrice=this.price;
    }
    else if (this.value<0) {

    }
  }

  markAsComplete(){
    if (this.value>=0){
      this.appointmentService.userMarkComplete(this.appointment.appointmentId,this.value).subscribe((res:any)=>{
        if (res){
          navigator.geolocation.clearWatch(this.watchPositionId);
          this.appointmentService.snackBar(res.msg);
          this.getAppointmentDetails();
        }
      });
    }
    else {
      this.appointmentService.snackBar("Please enter spent time.");

    }
  }

  check(){

  }
}
