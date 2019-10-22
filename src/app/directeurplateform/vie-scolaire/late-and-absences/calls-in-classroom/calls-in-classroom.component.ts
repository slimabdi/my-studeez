import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calls-in-classroom',
  templateUrl: './calls-in-classroom.component.html',
  styleUrls: ['./calls-in-classroom.component.css']
})
export class CallsInClassroomComponent implements OnInit {
  liste: any = true;
  S_appel: any = false;
  Add: any = false;
  Liste_E: any = false;
  private _opened: boolean = false;

  private _toggleSidebar() {
    this._opened = !this._opened;
  }

  data: any = [
    {
      icon: 'nomicon.png' ,
      name: 'nom de l enseignant',
      class: 'CETA-CEB1-CM2C...+',
      mail: 'enseignant@gmail.com',
      telephone: '0670674927'
    },
    {
      icon: 'nomicon.png' ,
      name: 'nom de l enseignant',
      class: 'CETA-CEB1-CM2C...+',
      mail: 'enseignant@gmail.com',
      telephone: '0670674927'
    },
    {
      icon: 'nomicon.png' ,
      name: 'nom de l enseignant',
      class: 'CETA-CEB1-CM2C...+',
      mail: 'enseignant@gmail.com',
      telephone: '0670674927'
    },
    {
      icon: 'nomicon.png' ,
      name: 'nom de l enseignant',
      class: 'CETA-CEB1-CM2C...+',
      mail: 'enseignant@gmail.com',
      telephone: '0670674927'
    },
    {
      icon: 'nomicon.png' ,
      name: 'nom de l enseignant',
      class: 'CETA-CEB1-CM2C...+',
      mail: 'enseignant@gmail.com',
      telephone: '0670674927'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
