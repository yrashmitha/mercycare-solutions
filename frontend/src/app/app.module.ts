import {RouterModule} from "@angular/router";
import {UserLayoutModule} from "./layouts/user-layout/user-layout.module";
import {DefaultModule} from "./layouts/default/default.module";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {GooglePlaceModule} from "ngx-google-places-autocomplete";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptorService} from "./services/TokenInterceptor/token-interceptor.service";
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {AgmCoreModule} from "@agm/core";
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';



@NgModule({
  declarations: [AppComponent, UnauthorizedComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DefaultModule,
    SharedModule,
    UserLayoutModule,
    RouterModule,
    BrowserAnimationsModule,
    GooglePlaceModule,
    MatOptionModule,
    MatSelectModule,
    NgbPaginationModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyAYuDnSvsQCeSl9NcOtIXSuDJyxGJHerTo'
    })

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },

  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
