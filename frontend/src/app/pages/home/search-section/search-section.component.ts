import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {HomeDataService} from "../../../services/Home/home-data.service";
import {Specialization} from "../../../shared/models/specialization";
import {Router} from "@angular/router";
import {Role} from "../../../shared/models/role";


interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.css']
})
export class SearchSectionComponent implements OnInit {

  myFormControl:FormGroup ;


  roles:Role[];

  specializations:Specialization[]=[];
  filteredSpecializations: Observable<Specialization[]>;

  constructor(private homeData:HomeDataService,private router:Router){}

  ngOnInit() {
    this.myFormControl=new FormGroup({
      specialization:new FormControl(""),
      docName:new FormControl(""),
      type:new FormControl("")
    });
    this.getSpecializations();
    this.getRoles();
  }

  getSpecializations(){
    if (this.homeData.rolesArray.length == 0){
      this.homeData.getSpecializations().subscribe((res)=>{
        this.specializations=res;
        this.filteredSpecializations = this.myFormControl.controls.specialization.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter1(value))
          );
      });
    }
    else {
      this.specializations=this.homeData.specializations;
      this.filteredSpecializations = this.myFormControl.controls.specialization.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter1(value))
        );
    }
  }

  getRoles(){
    if (this.homeData.rolesArray.length == 0){
      this.homeData.getTypes().subscribe((res)=>{
        this.roles=res;
      });
    }
    else {
      this.roles=this.homeData.rolesArray;
    }
  }

  private _filter1(value: string): Specialization[] {
    const filterValue = value.toLowerCase();

    return this.specializations.filter(option => option.specializationName.toLowerCase().includes(filterValue));
  }

  check(){
    let doctor;
    let specialization;
    console.log(this.myFormControl)

    this.router.navigate(['results'],{
      queryParams:{
        doctor:this.myFormControl.value.docName.trim(),
        specialization:this.myFormControl.value.specialization.trim(),
        type:this.myFormControl.value.type.trim(),
      }
    })

    // if (this.myFormControl.value.docName == null  && this.myFormControl.value.specialization ==null) {
    //   console.log('both null')
    //
    // }
    // else if (this.myFormControl.value.docName != ""  || this.myFormControl.value.specialization !=""){
    //   if (this.myFormControl.value.docName !="" && this.myFormControl.value.docName!=null){
    //     doctor=this.myFormControl.value.docName;
    //     console.log(doctor)
    //   }
    //   if (this.myFormControl.value.specialization !="" && this.myFormControl.value.specialization!=null){
    //     specialization=this.myFormControl.value.specialization
    //     console.log(specialization)
    //   }
    //   else {
    //     console.log("ignore me")
    //   }
    // }
    // else {
    //   console.log("both empty?")
    // }

  }
}
