import { DashboardComponent } from './pages/UserLayout/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/DefaultLayout/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { RegisterComponent } from './pages/DefaultLayout/register/register.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import {VerifyComponent} from "./pages/DefaultLayout/verify/verify.component";
import {ResultsComponent} from "./pages/DefaultLayout/results/results.component";
import {UserRegisterComponent} from "./pages/DefaultLayout/user-register/user-register.component";
import {MakeAppointmentComponent} from "./pages/DefaultLayout/make-appointment/make-appointment.component";
import {AppointmentsComponent} from "./pages/UserLayout/appointments/appointments.component";
import {UserLoginComponent} from "./pages/DefaultLayout/user-login/user-login.component";
import {PendingAppointmentComponent} from "./pages/UserLayout/pending-appointment/pending-appointment.component";
import {AppointmentDetailsComponent} from "./pages/UserLayout/appointment-details/appointment-details.component";
import {AppointmentDetailsForDoctorComponent} from "./pages/UserLayout/appointment-details-for-doctor/appointment-details-for-doctor.component";
import {TrackingComponent} from "./pages/UserLayout/tracking/tracking.component";
import {RouteGuardService} from "./services/Guards/route-guard.service";
import {DoctorGuardService} from "./services/Guards/doctor-guard.service";
import {PatientGuardService} from "./services/Guards/patient-guard.service";
import {UnauthorizedComponent} from "./pages/unauthorized/unauthorized.component";
import {ProfileComponent} from "./pages/UserLayout/profile/profile.component";
import {DoctorProfileComponent} from "./pages/UserLayout/doctor-profile/doctor-profile.component";
import {AddMembersComponent} from "./pages/UserLayout/add-members/add-members.component";


const routes: Routes = [
  {
    path:'',
    component:DefaultComponent,
    children:[
      {
        path:'login',
        component:LoginComponent,
        data:{
          name:'My Login'
        }
      },
      {
        path:'d/login',
        component:UserLoginComponent
      },
      {
        path:'register',
        component:RegisterComponent
      },
      {
        path:'user/register',
        component:UserRegisterComponent
      },
      {
        path:'verify',
        component:VerifyComponent
      },
      {
        path:'results',
        component:ResultsComponent
      },
      {
        path:'appointment/:id',
        component:MakeAppointmentComponent,
        canActivate:[RouteGuardService]
      },
      {
        path:'',
        component:HomeComponent
      }
    ]
  },
  {
    path:'dashboard',
    component:UserLayoutComponent,
    children:[
      {
        path:'',
        component:DashboardComponent,
        canActivate:[RouteGuardService]
      },
      {
        path:'appointments/:id',
        component:AppointmentDetailsComponent,
        canActivate:[RouteGuardService,PatientGuardService]
      },
      {
        path:'profile',
        component:ProfileComponent,
        canActivate:[RouteGuardService,PatientGuardService],

      },
      {
        path:'d/appointments/:id',
        component:AppointmentDetailsForDoctorComponent,
        canActivate:[DoctorGuardService]
      },
      {
        path:'d/profile',
        component:DoctorProfileComponent,
        canActivate:[DoctorGuardService]
      },
      {
        path:'appointments',
        component:AppointmentsComponent,
        canActivate:[RouteGuardService]
      },
      {
        path:'d/appointments',
        component:PendingAppointmentComponent,
        canActivate:[DoctorGuardService]
      },
      {
        path:'tracking/:id',
        component:TrackingComponent,
        canActivate:[RouteGuardService]
      },
      {
        path:'members/:id',
        component:AddMembersComponent,
        canActivate:[RouteGuardService,PatientGuardService]
      },

    ]
  },
  {
    path:'unauthorized',
    component:UnauthorizedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
