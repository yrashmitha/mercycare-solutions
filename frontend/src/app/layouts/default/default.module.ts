
import { MatButtonModule } from "@angular/material/button";
import { ResultsComponent } from "../../pages/DefaultLayout/results/results.component";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "../../pages/DefaultLayout/login/login.component";
import { HomeComponent } from "./../../pages/home/home.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DefaultComponent } from "./default.component";
import { RegisterComponent } from "src/app/pages/DefaultLayout/register/register.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {NgOtpInputModule} from "ng-otp-input";
import {HttpClientModule} from "@angular/common/http";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatDatepickerModule, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {VerifyComponent} from "../../pages/DefaultLayout/verify/verify.component";
import {MatCardModule} from "@angular/material/card";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {SearchSectionComponent} from "../../pages/home/search-section/search-section.component";
import {UserRegisterComponent} from "../../pages/DefaultLayout/user-register/user-register.component";
import {MakeAppointmentComponent} from "../../pages/DefaultLayout/make-appointment/make-appointment.component";
import {AgmCoreModule} from "@agm/core";
import {UserLoginComponent} from "../../pages/DefaultLayout/user-login/user-login.component";
import {AddMembersComponent} from "../../pages/UserLayout/add-members/add-members.component";


@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ResultsComponent,
    VerifyComponent,
    SearchSectionComponent,
    UserRegisterComponent,
    MakeAppointmentComponent,
    UserLoginComponent,
    AddMembersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgOtpInputModule,
    HttpClientModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatCardModule,
    MatAutocompleteModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyAYuDnSvsQCeSl9NcOtIXSuDJyxGJHerTo'
    })
  ],

})
export class DefaultModule {}
