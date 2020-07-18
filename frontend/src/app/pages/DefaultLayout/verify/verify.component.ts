import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/Auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatProgressButtonOptions} from "mat-progress-buttons";
declare var $:any;

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit ,AfterViewInit{
  @ViewChild('ngOtpInput') ngOtpInputRef:any;//Get reference using ViewChild and the specified hash

  btnOpts: MatProgressButtonOptions = {
    active: false,
    text: 'Verify',
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

  mobileNumber;
  code;
  valid=false;
  msg;
  constructor(private route:ActivatedRoute,private auth:AuthService,private snackBar:MatSnackBar,private router:Router) { }

  ngOnInit(): void {
    this.mobileNumber=this.route.snapshot.queryParamMap.get('number');
    console.log(this.mobileNumber)
  }
  onOtpChange(event){
    this.code=event;
    if (this.code.length == 5){
      this.valid=true;
    }
  }

  otpError(){
    this.ngOtpInputRef.setValue("error");//yourvalue can be any string or number eg. 1234 or '1234'
  }

  onVerify(){
    this.btnOpts.active = true;

    this.auth.otpVerify(this.mobileNumber,this.code).subscribe(res=>{
      this.handleOtpResponse(res);
    },err=>{
      this.handleError(err);
    })
  }

  handleOtpResponse(response){
    this.btnOpts.active = false;
    if (response.status==1){
      this.msg=response.msg;
      let snackBarRef=this.snackBar.open(this.msg,'Ok',{verticalPosition:"bottom",horizontalPosition:"right"})
      snackBarRef.onAction().subscribe(() => {
        this.router.navigate(['login']);
      });
    }
    else {
      this.msg=response.msg;
      this.otpError();
      this.snackBar.open(this.msg,'Ok',{verticalPosition:"bottom",horizontalPosition:"right"})
    }
  }

  handleError(err){
    console.log(err)
    this.btnOpts.active=false;
    this.msg=err.statusText;
    this.otpError();
    this.snackBar.open(this.msg,'Ok',{verticalPosition:"bottom",horizontalPosition:"right",duration:2000})
  }

  ngAfterViewInit(): void {
    $('.wrapper').css('min-height','unset');
  }
}
