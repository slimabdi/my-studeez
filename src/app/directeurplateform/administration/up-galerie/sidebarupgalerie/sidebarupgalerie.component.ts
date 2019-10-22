
import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../../services/auth.service";
import {UpGalerieService} from "../../../../services/UpGalerie.service";

import {UpGalerie} from "../../../../modelsDirecteurPlateform/UpGalerie.model";


@Component({
  selector: 'app-sidebarupgalerie',
  templateUrl: './sidebarupgalerie.component.html',
  styleUrls: ['./sidebarupgalerie.component.css']
})
export class SidebarupgalerieComponent implements OnInit {
  @Input() upgalerie:UpGalerie=new UpGalerie()
  @Output() data = new EventEmitter<boolean>();

  constructor(private upgalerieService:UpGalerieService ,private authservice:AuthService,public http: HttpClient)
  {}

  ngOnInit() {
  }





}
