import {Component, OnInit, ViewChild} from '@angular/core';
import {GooglePlaceDirective} from "ngx-google-places-autocomplete";
import {Address} from "ngx-google-places-autocomplete/objects/address";
import {MatProgressButtonOptions} from "mat-progress-buttons";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Appointment} from "../../../shared/models/appointment";
import {AppointmentDataService} from "../../../services/Appointment/appointment-data.service";
import {AuthService} from "../../../services/Auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FireAuthService} from "../../../services/Auth/fire-auth.service";
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.css']
})
export class MakeAppointmentComponent implements OnInit {
  @ViewChild("placesRef") placesRef: GooglePlaceDirective;

  btnOpts: MatProgressButtonOptions = {
    active: false,
    text: 'Make appointment',
    spinnerSize: 19,
    raised: true,
    stroked: true,
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

  options = {
    types: [],
    componentRestrictions: {country: 'LK'}
  };

  lat;
  long;
  doctorId;
  address;
  appointmentForm:FormGroup;
  patientFireId;

  constructor(private appointmentService:AppointmentDataService,
              private auth:AuthService,private route:ActivatedRoute,
              private router:Router,private snack:MatSnackBar,private fireAuth:FireAuthService,private afAuth:AngularFireAuth) {
  }

  ngOnInit(): void {
    //getting selected doctor id from url
    this.doctorId=this.route.snapshot.paramMap.get('id');
    // making form group
    this.appointmentForm=new FormGroup({
      extraMessage:new FormControl("",[Validators.minLength(5)]),
      address:new FormControl(null,[Validators.required])
    });

    // subscribing to authState and getting userId
    this.afAuth.user.subscribe(user=>{
      console.log(user)
      this.patientFireId=user.uid;
    })

    navigator.geolocation.getCurrentPosition(res=>{
      this.lat=res.coords.latitude;
      this.long=res.coords.longitude;
    })

  }

  public handleAddressChange(address: Address) {
    this.address=address.formatted_address;
    this.lat = address.geometry.location.lat();
    this.long = address.geometry.location.lng();
  }


  markerDragEnd(event) {
    console.log(event.coords);
    this.long=event.coords.lng;
    this.lat=event.coords.lat;
  }

  onSubmit(){
    this.btnOpts.active=true;
    let coords={
      lat:this.lat,
      long:this.long
    };

    console.log(this.fireAuth.currentUser())

    this.appointmentService.createAppointment(this.auth.getUser().id,this.patientFireId,this.doctorId,this.address,
      this.appointmentForm.value.extraMessage,JSON.stringify(coords))
      .subscribe(res=>{
        if (res.appointmentId){
          this.btnOpts.active=false;
          this.snack.open('Appointment created successfully.','Ok',{
            duration:4000,
            verticalPosition:"bottom",
            horizontalPosition:"center"
          });
          this.router.navigate(['/dashboard/appointments/',res.appointmentId]);
        }
      },err=>{
        this.btnOpts.active=true;
      });
  }


}
