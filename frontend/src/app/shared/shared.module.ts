import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DefaultNavbarComponent } from './components/default-navbar/default-navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHeaderNavComponent } from './components/user-header-nav/user-header-nav.component';
import { UserFooterComponent } from './components/user-footer/user-footer.component';
import {MatProgressButtonsModule} from "mat-progress-buttons";
import {NgProgressModule} from "ngx-progressbar";
import {NgProgressHttpModule} from "ngx-progressbar/http";
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDividerModule} from "@angular/material/divider";
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {environment} from "../../environments/environment";
import {AgmCoreModule} from "@agm/core";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatBadgeModule} from "@angular/material/badge";
import {AgmDirectionModule} from "agm-direction";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatListModule} from "@angular/material/list";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {GooglePlaceModule} from "ngx-google-places-autocomplete";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDialogModule} from "@angular/material/dialog";






@NgModule({
  declarations: [DefaultNavbarComponent,FooterComponent,SidebarComponent, UserHeaderNavComponent, UserFooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatProgressButtonsModule.forRoot(),
    NgProgressModule.withConfig({
      color:"#ffa69e",
      thick:false,
      spinner:true,
      spinnerPosition:"right"

    }),
    NgProgressHttpModule,
    MatSnackBarModule,
    MatCardModule,
    MatDividerModule,
    NgbPaginationModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyAYuDnSvsQCeSl9NcOtIXSuDJyxGJHerTo'
    }),
    MatButtonModule,
    MatBadgeModule,
    AgmDirectionModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    GooglePlaceModule,
    MatStepperModule,
    MatDialogModule

  ],
  exports:[DefaultNavbarComponent,MatSnackBarModule,FooterComponent,SidebarComponent,UserHeaderNavComponent,
    UserFooterComponent,MatProgressButtonsModule,NgProgressModule,NgProgressHttpModule,
    MatDividerModule,NgbPaginationModule,AngularFireModule, AngularFireAuthModule,
    AngularFirestoreModule,AgmCoreModule,MatCardModule,MatButtonModule,MatBadgeModule,
    AgmDirectionModule,MatSelectModule,MatIconModule,ReactiveFormsModule,
    FormsModule,MatInputModule,MatListModule,MatSlideToggleModule,GooglePlaceModule,MatStepperModule,MatDialogModule
  ]

})
export class SharedModule { }
