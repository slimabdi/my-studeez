import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebarplagehoraire',
  templateUrl: './sidebarplagehoraire.component.html',
  styleUrls: ['./sidebarplagehoraire.component.css']
})
export class SidebarplagehoraireComponent implements OnInit {
  dis:any=true
  voir:any=false
  add:any=true
  msg:any=false
  constructor() { }

  ngOnInit() {
  }

}
