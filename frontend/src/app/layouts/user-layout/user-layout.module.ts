import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../../pages/UserLayout/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLayoutComponent } from './user-layout.component';
import {AgmCoreModule} from "@agm/core";
import {AppointmentsComponent} from "../../pages/UserLayout/appointments/appointments.component";
import {PendingAppointmentComponent} from "../../pages/UserLayout/pending-appointment/pending-appointment.component";
import {AppointmentDetailsComponent} from "../../pages/UserLayout/appointment-details/appointment-details.component";
import {AppointmentDetailsForDoctorComponent} from "../../pages/UserLayout/appointment-details-for-doctor/appointment-details-for-doctor.component";
import {TrackingComponent} from "../../pages/UserLayout/tracking/tracking.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {ProfileComponent} from "../../pages/UserLayout/profile/profile.component";
import {DoctorProfileComponent} from "../../pages/UserLayout/doctor-profile/doctor-profile.component";
import {UpdateMemberComponent} from "../../pages/UserLayout/dialog/update-member/update-member.component";



@NgModule({
  declarations: [DashboardComponent,UserLayoutComponent,AppointmentsComponent,
    PendingAppointmentComponent,AppointmentDetailsComponent,AppointmentDetailsForDoctorComponent,
    TrackingComponent,ProfileComponent,DoctorProfileComponent,UpdateMemberComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyAYuDnSvsQCeSl9NcOtIXSuDJyxGJHerTo'
    }),
    MatExpansionModule,
  ],
  entryComponents: [
    UpdateMemberComponent
  ],
})
export class UserLayoutModule { }
