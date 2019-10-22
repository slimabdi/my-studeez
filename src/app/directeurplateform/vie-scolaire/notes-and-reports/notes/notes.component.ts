import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  private _opened: boolean = false;

  private _toggleSidebar() {
    this._opened = !this._opened;
  }

  Add: any = true;
  classe: any = false;
  constructor() { }

  ngOnInit() {
  }

}
