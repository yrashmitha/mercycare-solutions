import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Address} from "ngx-google-places-autocomplete/objects/address";
import {ActivatedRoute} from "@angular/router";
import {ProfileDataService} from "../../../services/Profile/profile-data.service";
import {PatientProfile} from "../../../shared/models/patient-profile";
import {MemberAuthService} from "../../../services/Auth/member-auth.service";
import {Patient} from "../../../shared/models/patient";
import {MatDialog} from "@angular/material/dialog";
import {UpdateMemberComponent} from "../dialog/update-member/update-member.component";
import {from} from "rxjs";
import {MemberPatient} from "../../../shared/models/member-patient";

declare var $: any;

interface Title {
  value: string;
}

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})
export class AddMembersComponent implements OnInit {
  signUpForm: FormGroup;
  options = {};
  lat;
  long;
  alert = false;
  titles: Title[] = [
    {value: 'Mr'},
    {value: 'Mrs'},
    {value: 'Miss'},
    {value: 'Rev'},
    {value: 'Doctor'},

  ];

  showFields = false;
  myMembers: MemberPatient[] = [];
  id;
  patient: PatientProfile;

  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute,
              private profileService: ProfileDataService,
              private memberService: MemberAuthService,
              private dialog: MatDialog,private memberAuth:MemberAuthService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.getMyMembers();

    this.signUpForm = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          firstName: [null, [
            Validators.required,
            Validators.minLength(3),
          ]],
          lastName: [null, [
            Validators.required,
            Validators.minLength(3),
          ]],
          title: [null, [
            Validators.required,
          ]],
        }),


        this._formBuilder.group({
          address: new FormControl(null, [
            Validators.required,
            Validators.minLength(3),
          ]),
        }),

        this._formBuilder.group({
          phoneNumber: new FormControl(null, [
            Validators.required,
            Validators.pattern("^((\\+91-?))?[0-9]{9}$"),
          ]),
          email: new FormControl(null, [
            Validators.email,
          ]),
        }),
      ])
    });

    this.getData();
  }

  getData() {
    this.profileService.getProfileData(this.id).subscribe(res => {
      this.patient = res;
    })
  }

  handleAddressChange(address: Address) {
    this.lat = address.geometry.location.lat();
    this.long = address.geometry.location.lng();
    console.log(address)
    let x = $("#address").val();
    this.address.patchValue({address: x});
    console.log(this.address.value.address);
  }

  markerDragEnd(event) {
    console.log(event.coords);
    this.long = event.coords.lng;
    this.lat = event.coords.lat;
  }

  get formArray(): AbstractControl | null {
    return this.signUpForm.get('formArray');
  }

  get address() {
    return this.signUpForm.get('formArray').get([1]);
  }

  get names() {
    return this.signUpForm.get('formArray').get([0]);
  }

  get phoneNumber() {
    return this.signUpForm.get('formArray').get([2]);
  }

  setPatientAddress() {
    this.address.setValue({
      address: this.patient.address
    });
    let coords = JSON.parse(this.patient.geoCoords);
    this.lat = coords.lat;
    this.long = coords.long;
    console.log(this.address.value.address)
    this.alert = true;
  }

  enterNewAddress() {
    this.alert = false;
    this.showFields = true;
  }

  onSubmit(stepper) {
    this.showFields = false;
    this.alert = false;
    let formData = new FormData();
    formData.append("f_name", this.names.value.firstName);
    formData.append("l_name", this.names.value.lastName);
    formData.append("title", this.names.value.title);
    formData.append("address", this.address.value.address);
    formData.append("mobile_num", '+94' + this.phoneNumber.value.phoneNumber);
    formData.append("email", this.phoneNumber.value.email);

    let coords = {
      lat: this.lat,
      long: this.long
    };
    formData.append("geo_coords", JSON.stringify(coords));

    this.memberService.addMember(formData).subscribe((res: any) => {
      this.memberService.openSnackBar(res.msg);
      this.getMyMembers();
      // stepper.reset();
    })


  }

  getMyMembers() {
    this.memberService.getMyMembers().subscribe(res => {
      this.myMembers = res;
    })
  }

  onClickUpdate(member: MemberPatient) {
    let title = member.title;
    let firstName = member.firstName;
    let lastName = member.lastName;
    let address = member.address;
    let coords = JSON.parse(member.geoCoords)
    let mobileNumber = member.mobileNumber;
    let memberId=member.id;
    let email=member.email;
    let dialogRef = this.dialog.open(UpdateMemberComponent, {
      data: {
        title: title,
        firstName: firstName,
        lastName: lastName,
        address: address,
        coords: {
          lat: coords.lat,
          long: coords.long
        },
        mobileNumber: mobileNumber,
        email:email
      }
    })
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      let form=new FormData();
      if (res.firstName){
        form.append("f_name", res.firstName);
        form.append("l_name", res.lastName);
        form.append("title", res.title);
        form.append("address", res.address);
        form.append("mobile_num",res.mobileNumber);
        form.append("email", res.email);
        form.append("geo_coords", JSON.stringify(res.coords));
        console.log(JSON.stringify(res.coords))

        this.memberAuth.updateMemberDetails(form,memberId).subscribe(res=>{
          this.memberAuth.openSnackBar(res)
          this.getMyMembers();
        })
      }
    })
  }
}
