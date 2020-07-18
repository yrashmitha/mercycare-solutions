import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit {


  private _opened: boolean = false;

  private _toggleSidebar() {
    this._opened = !this._opened;
  }


  constructor() { }

  ngOnInit(): void {
  }

}
