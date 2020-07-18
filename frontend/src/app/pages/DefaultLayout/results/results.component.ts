import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ResultDataService} from "../../../services/Results/result-data.service";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Doctor} from "../../../shared/models/doctor";
import {BackendData} from "../../../shared/models/backend-data";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {


  staticUrl=BackendData.storageLink;
  doctor: string;
  specialization: string;
  type: string;
  ref: any;
  item: Observable<any>;
  page = 1;
  limit: any = 8;
  skip: any;
  private itemDoc: AngularFirestoreDocument<any>;
  collectionSize:any;

  docArray:Doctor[]=[];

  constructor(private route: ActivatedRoute, public resultService: ResultDataService, private fire: AngularFirestore) {
  }

  ngOnInit(): void {

    this.doctor = this.route.snapshot.queryParamMap.get('doctor');
    this.specialization = this.route.snapshot.queryParamMap.get('specialization');
    this.type = this.route.snapshot.queryParamMap.get('type');
    this.handleResult(this.doctor, this.specialization, this.type);

  }

  handleResult(doctor, specialization, type) {
    var obj: any;
    if (this.page == 1) {
      this.skip = 0;
    } else {
      this.skip = (this.page - 1) * this.limit
    }
    obj = {
      "skip": this.skip,
      "limit": this.limit
    };
    this.resultService.getDefault(doctor, type, specialization, obj).subscribe(res => {
     this.docArray=res.doctors;
     this.collectionSize=res.count;

    })
  }


  setPaginations(event) {
    this.docArray.splice(0, this.docArray.length);
    this.page = event;
    this.handleResult(this.doctor, this.specialization, this.type);
  }
}
