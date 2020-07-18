import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {PatientProfile} from "../../shared/models/patient-profile";
import {BackendData} from "../../shared/models/backend-data";
import {map, tap} from "rxjs/operators";
import {UserProfile} from "../../shared/models/user-profile";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HomeDataService} from "../Home/home-data.service";
import {Specialization} from "../../shared/models/specialization";

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService {
  arr: Specialization[] = [];
  patientAvatar: string = '';
  userAvatar: string = '';


  public uAvatar = new BehaviorSubject(false);
  uAvatarChanged = this.uAvatar.asObservable();

  constructor(private http: HttpClient, private snack: MatSnackBar, private home: HomeDataService) {
  }

  getProfileData(patientId): Observable<any> {
    return this.http.get<any>(BackendData.backendApiUrl + 'p/profile/' + patientId)
      .pipe(map((res: any) => {
        let x = new PatientProfile();
        x.deserialize(res[0]);
        return x;
      }));
  }

  getUserProfileData(userId): Observable<any> {
    return this.http.get<any>(BackendData.backendApiUrl + 'd/profile/' + userId)
      .pipe(map((res: any) => {
        let x = new UserProfile();
        x.deserialize(res);
        return x;
      }));
  }

  changeAvatar(formData: FormData): Observable<any> {
    return this.http.post(BackendData.backendApiUrl + 'p/changeavatar', formData)
  }

  changeUserAvatar(formData: FormData): Observable<any> {
    return this.http.post(BackendData.backendApiUrl + 'd/changeavatar', formData)
  }

  openSnackBar(msg) {
    this.snack.open(msg, 'Ok', {
      verticalPosition: "bottom",
      horizontalPosition: "right",
      duration: 4000
    })
  }

  getAllSpecializations() {
    let arr = [];
    return this.http.get<Specialization[]>(BackendData.backendApiUrl + 'get/specializations')
      .pipe(map((res: any) => {
        res.forEach(obj => {
          let x = new Specialization();
          x.deserialize(obj);
          arr.push(x);
        });
        return arr;
      }));
  }

  transportChargesChange(transportId, price) {
    return this.http.post(BackendData.backendApiUrl + 'd/changepriceperkm', {
      price: price,
      transport_id: transportId
    })
  }

  deleteUserTransport(transportId) {
    return this.http.get(BackendData.backendApiUrl + 'd/deletetransport/' + transportId)
  }

  addNewUserTransport(transportId, price) {
    return this.http.post(BackendData.backendApiUrl + 'd/newtransport/', {
      transport_id: transportId,
      price: price
    })
  }

  updateSpecializations(formData: FormData) {
    return this.http.post(BackendData.backendApiUrl + 'd/specializationupdate/', formData)
  }

  getPatientAvatar(patientId): Observable<any> {
    return this.http.get<any>(BackendData.backendApiUrl + 'p/avatar/' + patientId)
      .pipe(tap((res: any) => {
        this.patientAvatar = res;
        return res;
      }));
  }

  getUserAvatar(userId): Observable<any> {
    return this.http.get<any>(BackendData.backendApiUrl + 'd/avatar/' + userId)
      .pipe(tap((res: any) => {
        this.userAvatar = res;
        return res;
      }));
  }

  updateUserData(form:FormData){
    return this.http.post(BackendData.backendApiUrl + 'd/updateuserdata/',form)
  }

  setUAvatarState(state){
    this.uAvatar.next(state)
  }
}
