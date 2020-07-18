import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';


  constructor(private fireAuth:AngularFireAuth){}

  ngOnInit(): void {
    this.fireAuth.authState.subscribe(res=>{
      if (res){
        console.log('user is here')
      }
      else {
        console.log("user no longer available")
      }
    })
  }

}
