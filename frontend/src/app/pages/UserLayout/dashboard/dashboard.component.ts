import { Component, OnInit } from '@angular/core';
import {AppointmentDataService} from "../../../services/Appointment/appointment-data.service";
import {AuthService} from "../../../services/Auth/auth.service";
import {Appointment} from "../../../shared/models/appointment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  panelOpenState = false;
  appointmentArray:Appointment[];

  constructor() { }

  ngOnInit(): void {

  }

}
