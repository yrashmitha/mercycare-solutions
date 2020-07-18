import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppointmentDataService} from "../../../services/Appointment/appointment-data.service";
import {Appointment} from "../../../shared/models/appointment";
import {AuthService} from "../../../services/Auth/auth.service";

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {

  appointmentId;
  appointment: Appointment;
  patientGeoCoords;
  userGeoCoords;

  distance = 'N/A';
  duration = "N/A";
  price = "N/A";

  alertClass = "alert alert-dismissible fade show alert-";
  newAlertClass;
  alertMsg = "";

  constructor(private route: ActivatedRoute, private appointmentService: AppointmentDataService,
              public auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.appointmentId = this.route.snapshot.paramMap.get('id');
    console.log(this.appointmentId);
    this.appointmentService.getAppointmentData(this.appointmentId).subscribe(res => {
      this.appointment = res;
      this.patientGeoCoords = JSON.parse(res.patientGeoCoords);
      if (this.appointment.userGeoCoords != null) {
        this.userGeoCoords = JSON.parse(res.userGeoCoords);
      }
      console.log(this.appointment);
      this.getAlertMessage(this.appointment.appointmentStatusName, this.appointment.userCompleted)
    })
  }

  getAlertMessage(statusName: string, userCompleted: number) {

    if (statusName.toLowerCase() == 'pending') {
      this.alertMsg = "Your appointment is still waiting for doctor's approval. You can contact doctor and ask him to review.";
      this.newAlertClass = this.alertClass.concat('warning')
    }
    if (statusName.toLowerCase() == 'accepted') {
      this.alertMsg = "Your appointment is accepted from the doctor. Contact him and ask more details.";
      this.newAlertClass = this.alertClass.concat('success')
    }
    if (statusName.toLowerCase() == 'on going') {
      if (userCompleted == 1) {
        this.alertMsg = "Your doctor is mark as completed on your appointment.";
        this.newAlertClass = this.alertClass.concat('info')
      } else {
        this.alertMsg = "Your doctor is working on your appointment.";
        this.newAlertClass = this.alertClass.concat('success')
      }
    }
    if (statusName.toLowerCase() == 'completed') {
      this.alertMsg = "This appointment is marked as completed.";
      this.newAlertClass = this.alertClass.concat('success')
    }
  }

  viewTracking() {
    this.router.navigate(['dashboard/tracking', this.appointmentId]);
  }

  onMarkComplete(appointmentId) {
    this.appointmentService.patientMarkComplete(appointmentId).subscribe((res: any) => {
      this.handleCompleteResponce(res);
    })
  }

  handleCompleteResponce(responce) {
    if (responce.status) {
      this.appointmentService.snackBar(responce.msg);
      this.router.navigate(['dashboard'])
    } else {
      this.appointmentService.snackBar(responce.msg);
    }
  }

}
