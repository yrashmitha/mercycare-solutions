import { Component, OnInit } from '@angular/core';
import {AppointmentDataService} from "../../../services/Appointment/appointment-data.service";
import {AuthService} from "../../../services/Auth/auth.service";
import {Appointment} from "../../../shared/models/appointment";
import {Router} from "@angular/router";
import {ProfileDataService} from "../../../services/Profile/profile-data.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  panelOpenState = false;
  appointmentArray:Appointment[];

  name;
  constructor(public profileService:ProfileDataService,private auth:AuthService) { }

  ngOnInit(): void {
    console.log(this.auth.getUser());
    this.name = this.auth.isDoctor() ? this.auth.getUser().name : this.auth.getUser().title + " "+ this.auth.getUser().f_name
    // this.name = this.auth.getUser().title + " "+ this.auth.getUser().f_name;
  }

  check() {
    this.name = this.profileService.patient.name;
  }
}
