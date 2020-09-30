import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Address} from "ngx-google-places-autocomplete/objects/address";

declare var $:any;

interface Title {
  value: string;
}

@Component({
  selector: 'app-update-member',
  templateUrl: './update-member.component.html',
  styleUrls: ['./update-member.component.css']
})
export class UpdateMemberComponent implements OnInit,AfterViewInit {
  titles: Title[] = [
    {value: 'Mr'},
    {value: 'Mrs'},
    {value: 'Miss'},
    {value: 'Rev'},
    {value: 'Doctor'},

  ];
  options: any;
   lat: number;
   long: number;
  private address: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  handleAddressChange(address: Address) {
    $("div.pac-container").css('z-index','1055')
    this.data.coords.lat = address.geometry.location.lat();
    this.data.coords.long = address.geometry.location.lng();
    console.log(address)
    this.data.address=$("#address").val();

  }

  markerDragEnd(event) {
    console.log(event.coords);
    this.data.coords.long = event.coords.lng;
    this.data.coords.lat = event.coords.lat;
  }

  ngAfterViewInit(): void {
    $(".cdk-overlay-container").css('z-index','1050')
    $(".modal").css('z-index','1050')
    $(".modal-backdrop").css('z-index','1049')



  }

  change() {
    console.log('hi')
    $("div.pac-container").css('z-index','1055')
  }
}
