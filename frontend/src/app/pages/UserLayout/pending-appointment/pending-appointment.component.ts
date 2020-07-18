import { Component, OnInit } from '@angular/core';
import {AppointmentDataService} from "../../../services/Appointment/appointment-data.service";
import {Appointment} from "../../../shared/models/appointment";
import {AuthService} from "../../../services/Auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pending-appointment',
  templateUrl: './pending-appointment.component.html',
  styleUrls: ['./pending-appointment.component.css']
})
export class PendingAppointmentComponent implements OnInit {
  panelOpenState=false;
  appointmentArray:Appointment[];
  userId;
  constructor(private router:Router,private appointmentService:AppointmentDataService,private auth:AuthService) { }

  ngOnInit(): void {
    this.userId=this.auth.getUser().id;
    this.appointmentService.getAllUserAppointments(this.userId).subscribe(res=>{
      this.appointmentArray=res;
      console.log(this.appointmentArray)
    })
  }

  onClick(id){
    this.router.navigate(['dashboard/d/appointments/',id])
  }

}
