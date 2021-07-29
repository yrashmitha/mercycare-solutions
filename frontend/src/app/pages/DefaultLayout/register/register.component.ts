import {Component, OnInit, ViewChild} from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import {GooglePlaceDirective} from "ngx-google-places-autocomplete";
import {Address} from "ngx-google-places-autocomplete/objects/address";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/Auth/auth.service";
import {Patient} from "../../../shared/models/patient";
import {MatProgressButtonOptions} from "mat-progress-buttons";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FireAuthService} from "../../../services/Auth/fire-auth.service";

interface Title {
  value: string;
}

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],

})
export class RegisterComponent implements OnInit {


  btnOpts: MatProgressButtonOptions = {
    active: false,
    text: 'Register',
    spinnerSize: 19,
    raised: true,
    stroked: false,
    flat: false,
    fab: false,
    buttonColor: 'accent',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
    customClass: 'some-class',
    // add an icon to the button
    buttonIcon: {
      fontSet: 'fa',
      fontIcon: 'fa-user',
      inline: true
    }
  };

  msg;
  hide = true;
  selectedValue: string;
  selectedCar: string;
  startDate = new Date(1990, 0, 1);
  titles: Title[] = [
    {value: 'Mr'},
    {value: 'Mrs'},
    {value: 'Miss'},
    {value: 'Rev'},
    {value: 'Doctor'},

  ];

  address;
  lat;
  long;
  options={};
  signUpForm: FormGroup;

  constructor(private fire:FireAuthService,
              private router:Router,
              private authService:AuthService,
              private snackBar:MatSnackBar
  ) {}

  ngOnInit() {
    this.signUpForm = new FormGroup({
      phoneNumber: new FormControl("", [
        Validators.required,
        Validators.pattern("^((\\+91-?))?[0-9]{9}$"),
      ]),
      firstName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      address:new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      nic:new FormControl("", [
        Validators.required,
        Validators.minLength(10),
      ]),
      type:new FormControl("", [
        Validators.required,
      ]),
      // bday:new FormControl("", [
      //   Validators.required,
      // ]),
      password:new FormControl("", [
        Validators.required,
      ]),
      email:new FormControl("", [
        Validators.required,
        Validators.email
      ]),
    });

    // getting user location
    this.getUserLocation();
  }

  getUserLocation(){
    navigator.geolocation.getCurrentPosition(pos=>{
      this.lat=pos.coords.latitude;
      this.long=pos.coords.longitude;
    })


  }

  check(event) {
    console.log(event);
  }

  onSubmit(){
    this.btnOpts.active=true;
    let formdata=new FormData();
    let patient=new Patient();
    formdata.append('f_name',this.signUpForm.value.firstName);
    formdata.append('l_name',this.signUpForm.value.lastName);
    formdata.append('title',this.signUpForm.value.type);
    formdata.append('email',this.signUpForm.value.email);
    formdata.append('password',this.signUpForm.value.password);
    formdata.append('mobile_num','+94'+this.signUpForm.value.phoneNumber);
    formdata.append('nic',this.signUpForm.value.nic);
    formdata.append('address',this.signUpForm.value.address);
    let coords={
      lat:this.lat,
      long:this.long
    };
    formdata.append('geo_coords',JSON.stringify(coords));


    this.authService.register(formdata).subscribe(res=>{
      console.log(res);
      this.handleRegisterResponse(res);
    },err=>{
      this.handleError(err);
    })
  }

  handleRegisterResponse(response){
    this.btnOpts.active = false;
    if (response.patient){
      this.fire.createUserWithEmailAndPassword(this.signUpForm.value.email,this.signUpForm.value.password).then(res=>{
        let number="+94"+this.signUpForm.value.phoneNumber;
        //sign out firebase logged in user
        this.fire.signOut();
        this.router.navigate(['verify'],{
          queryParams:{
            number:number.toString()
          }
        });
      })

      this.msg=response.msg;
      this.snackBar.open(this.msg,'Ok',{verticalPosition:"bottom",horizontalPosition:"right",duration:4000})
    }
    else {
      this.msg= response.msg;
      this.snackBar.open(this.msg,'Ok',{verticalPosition:"bottom",horizontalPosition:"right",duration:4000})
    }
  }

  handleError(err){
    console.log(err)
    this.btnOpts.active=false;
    this.msg=err.statusText;
    this.snackBar.open(this.msg,'Ok',{verticalPosition:"bottom",horizontalPosition:"right",duration:2000})
  }


  handleAddressChange(address: Address) {
    this.lat = address.geometry.location.lat();
    this.long = address.geometry.location.lng();
    console.log(this.address)
  }

  markerDragEnd(event) {
    console.log(event.coords);
    this.long=event.coords.lng;
    this.lat=event.coords.lat;
  }
}
