import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {AngularFireAuth} from "@angular/fire/auth";
import {AppointmentDataService} from "../../../services/Appointment/appointment-data.service";

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

   appointmentRec:Observable<any>;

  appointmentId;

  constructor(public appointmentService:AppointmentDataService,public afs:AngularFirestore,private route:ActivatedRoute,private afAuth:AngularFireAuth) { }

  ngOnInit(): void {

    this.afAuth.authState.subscribe(user=>{
      console.log(user)
      this.appointmentRec=this.afs.doc<any>('appointments/'+this.appointmentId).valueChanges();
    })

    this.appointmentId=this.route.snapshot.paramMap.get('id');

  }

  check(){
    console.log("hi")

  }

}
