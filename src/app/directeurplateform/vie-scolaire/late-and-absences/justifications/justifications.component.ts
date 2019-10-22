import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-justifications',
  templateUrl: './justifications.component.html',
  styleUrls: ['./justifications.component.css']
})
export class JustificationsComponent implements OnInit {

  private _opened: boolean = false;

  private _toggleSidebar() {
    this._opened = !this._opened;
  }


  constructor() { }

  ngOnInit() {
  }

}
