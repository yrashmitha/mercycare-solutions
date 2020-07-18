import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/Auth/auth.service";
import {ProfileDataService} from "../../../services/Profile/profile-data.service";
import {PatientProfile} from "../../../shared/models/patient-profile";
import bsCustomFileInput from "bs-custom-file-input";
import {BackendData} from "../../../shared/models/backend-data";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Address} from "ngx-google-places-autocomplete/objects/address";


interface Title {
  value: string;
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  titles: Title[] = [
    {value: 'Mr'},
    {value: 'Mrs'},
    {value: 'Miss'},
    {value: 'Rev'},
    {value: 'Doctor'},

  ];
  imageForm: FormGroup;


  public url = BackendData.storageLink;
  fileData: File;
  id;
  // formArray = new FormArray([]);


  patient: PatientProfile = new PatientProfile();

  constructor( private profileService: ProfileDataService, private auth: AuthService) {
  }

  ngOnInit(): void {

    this.imageForm = new FormGroup({
      file: new FormControl()
    });
    bsCustomFileInput.init();


    this.id = this.auth.getUser().id;
    this.getData();
  }

  getData() {
    this.profileService.getProfileData(this.id).subscribe(res => {
      this.patient = res;
    })
  }


  onChangeFile(event) {
    this.fileData = event.srcElement.files[0];
    console.log(this.fileData);
  }

  upload() {
    const formdata = new FormData();

    formdata.append('file', this.fileData);
    formdata.append('patient_id', this.auth.getUser().id);
    this.profileService.changeAvatar(formdata).subscribe(res => {
      console.log(res);
      bsCustomFileInput.destroy();
      this.imageForm.reset();
      bsCustomFileInput.init();
      this.profileService.setUAvatarState(true);
      this.getData();

    })
  }





}
