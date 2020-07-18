import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {BackendData} from "../../../shared/models/backend-data";
import {ProfileDataService} from "../../../services/Profile/profile-data.service";
import {AuthService} from "../../../services/Auth/auth.service";
import bsCustomFileInput from "bs-custom-file-input";
import {UserProfile} from "../../../shared/models/user-profile";
import {Specialization} from "../../../shared/models/specialization";
import {Transport} from "../../../shared/models/transport";


@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {

  allSpecializations: Specialization[] = [];
  userSpecialization: Specialization[] = [];

  allTransports: Transport[] = [];
  userTransports: any[] = [];
  pricePerKm: number;
  selectedTransportId = null;
  newPricePerKm = null;
  selectedAvailableTransport=null;

  imageForm: FormGroup;
  userDataForm:FormGroup;

  name;
  pricePerHour;
  outOfOffice=false;
  public url = BackendData.storageLink;
  fileData: File;
  id;
  user: UserProfile = new UserProfile();
   displayUpdateBtn: boolean=false;

  constructor(private profileService: ProfileDataService, private auth: AuthService) {
  }

  getData() {
    this.profileService.getUserProfileData(this.id).subscribe((res: UserProfile) => {
      this.user = res;
      this.userSpecialization = res.userSpecializations;
      this.allTransports = res.allTransportTypes;
      this.userTransports = res.transportTypes;
      this.name=res.user.name;
      this.pricePerHour=res.user.pricePerHour;
      this.outOfOffice=this.convertIdToBoolean(res.user.statusId);
      console.log(this.outOfOffice)
      this.userDataForm.get('name').setValue(res.user.name);
      this.userDataForm.get('pricePerHour').setValue(res.user.pricePerHour);
      let x=this.setOutOfOfficeMode(res.user.statusId);
      this.userDataForm.get('outOfOffice').setValue(x);


    })
    this.profileService.getAllSpecializations().subscribe(res =>{
        console.log(res)
        this.allSpecializations=res;
      }

    )
  }
  ngOnInit(): void {
    this.imageForm = new FormGroup({
      file: new FormControl()
    });

    this.userDataForm = new FormGroup({
      name: new FormControl(''),
      pricePerHour:new FormControl(''),
      outOfOffice:new FormControl(false)
    });
    bsCustomFileInput.init();
    this.id = this.auth.getUser().id;
    this.getData();
  }

  convertIdToBoolean(id){
    if (id!=3){
      return false;
    } else return true;
  }

  setOutOfOfficeMode(id){
    if (id!=3){
      return false;
    }
    else {return true}
  }

  onChangeFile(event) {
    this.fileData = event.srcElement.files[0];
    console.log(this.fileData);
  }

  upload() {
    const formdata = new FormData();

    formdata.append('file', this.fileData);
    formdata.append('user_id', this.auth.getUser().id);
    this.profileService.changeUserAvatar(formdata).subscribe(res => {
      this.profileService.openSnackBar(res.message);
      bsCustomFileInput.destroy();
      this.imageForm.reset();
      bsCustomFileInput.init();
      this.getData();
      this.profileService.setUAvatarState(true);
    }, err => {
      this.profileService.openSnackBar("Unknown error occurred");

    })
  }


  addSpecializations(event) {
    console.log(event)
    this.userSpecialization = event._value;

  }

  addTransport(event) {
    this.userTransports = event._value
  }

  checkUserSpecialization(specializationId): boolean {
    const x = this.userSpecialization.some(o => o.id == specializationId);
    return x;
  }

  checkUserTransports(transportId): boolean {
    const x = this.userTransports.some(o => o.id == transportId);
    return x;
  }

  userTransportSelectionChange(event) {
    console.log(event);
    this.selectedTransportId = event.value;
    this.getPricePerKm(event.value)
  }

  availableTransportSelectionChange(event) {
    console.log(event);
    this.selectedAvailableTransport = event.value;
  }

  getPricePerKm(value): any {
    const x = this.userTransports.find(o => o.id == value);
    this.pricePerKm = x.pricePerKm;
  }

  disableDefault(value) {
    const x = this.userTransports.some(o => o.type == value);
    return x;
  }

  onUpdateCharges() {
    console.log(this.selectedTransportId + " " + this.pricePerKm);
    this.profileService.transportChargesChange(this.selectedTransportId, this.pricePerKm).subscribe((res: any) => {
      this.profileService.openSnackBar(res.msg);
      this.getData();
    })
  }

  onDeleteTransportType() {
    this.profileService.deleteUserTransport(this.selectedTransportId).subscribe((res: any) => {
      this.profileService.openSnackBar(res.msg);
      this.pricePerKm = null;
      this.getData();
    })
  }

  addNewTransportMethod() {
    if (this.newPricePerKm == null || this.selectedAvailableTransport == null) {
      this.profileService.openSnackBar("Select transport type and Enter price.")
    } else {
      this.profileService.addNewUserTransport(this.selectedAvailableTransport,this.newPricePerKm).subscribe((res: any) => {
        console.log(res)
        this.profileService.openSnackBar(res.msg);
        this.newPricePerKm = null;
        this.getData();
      },err=>{
        this.profileService.openSnackBar(err.msg);
      })
    }
  }

  updateSpecializationList(){
    let form=new FormData();
    form.append('specialization_id',this.userSpecialization.toString());
    this.profileService.updateSpecializations(form).subscribe((res:any)=>{
      this.profileService.openSnackBar(res.msg);
      this.getData();
    })
  }

  watchOutOfOfficeModeChange(event){
    this.watchChanges();
  }

  watchChanges(){
    if ((this.pricePerHour != this.userDataForm.value.pricePerHour) || (this.name != this.userDataForm.value.name) || (this.outOfOffice != this.userDataForm.value.outOfOffice)) {
      this.displayUpdateBtn=true;
    }
    else {
      this.displayUpdateBtn=false;
    }
  }

  onUpdateUserData(){
    let formData=new FormData();
    formData.append('name',this.userDataForm.value.name);
    formData.append('price_per_hour',this.userDataForm.value.pricePerHour);
    if (this.userDataForm.value.outOfOffice ==true){
      formData.append('status_id',"1");
    } else {
      formData.append('status_id',"0");
    }
    this.profileService.updateUserData(formData).subscribe((res:any)=>{
      console.log(res)
      this.profileService.openSnackBar(res.msg);
      this.getData();
      this.profileService.setUAvatarState(true);
      this.displayUpdateBtn=false;
    })
  }
}
