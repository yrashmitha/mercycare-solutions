import { Component, OnInit } from '@angular/core';
import {AppointmentDataService} from "../../../services/Appointment/appointment-data.service";
import {AuthService} from "../../../services/Auth/auth.service";
import {Router} from "@angular/router";
import {Appointment} from "../../../shared/models/appointment";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  panelOpenState = false;
  appointmentArray:Appointment[];

  constructor(private appointmentService:AppointmentDataService,
              public auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    if (this.auth.getUser().role){
      this.getAllUserPendingAppointments();
    }
    else {
      this.getAllPatientAppointments();
    }
  }

  getAllPatientAppointments(){
    let patientId=this.auth.getUser().id;
    this.appointmentService.getAllPatientAppointments(patientId).subscribe(res=>{
      this.appointmentArray=res;
    })
  }

  getAllUserPendingAppointments(){
    let UserId=this.auth.getUser().id;
    this.appointmentService.getAllUserAppointments(UserId).subscribe(res=>{
      this.appointmentArray=res;
    })
  }

  onClick(appointment:Appointment){
    this.router.navigate(['/dashboard/appointments',appointment.appointmentId])
  }

}
