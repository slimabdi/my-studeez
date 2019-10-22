import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {EcoleService} from "../../../../services/ecole.service";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';

export function getTimepickerConfig(): TimepickerConfig {
  return Object.assign(new TimepickerConfig(), {
    hourStep: 2,
    minuteStep: 10,
    showMeridian: false,
    readonlyInput: false,
    mousewheel: true,
    showMinutes: true,
    showSeconds: false
  });
}
@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css'],
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }]

})
export class PresentationComponent implements OnInit {
  mytime: string;

  color: any = '';
  color1: any = '';

  ecole: any = {};
  idEcole:any='';
  nomGroupe:any='';
  constructor(private authService:AuthService,private ecoleService :EcoleService,private  http :HttpClient, public toastr: ToastrService) {


    this.nomGroupe=this.authService.getNomGroupe();

    this.getEcole();
  }

  ngOnInit() {
  }
  updatePresentation(ecole){
    console.log("formulaire",ecole)
    this.ecoleService.updatePresentation(ecole).subscribe(resp => {
      this.ecole.emit(true);

    });

  }

  showSuccess(massage) {
    this.toastr.success(massage, 'Succès !', {
      timeOut: 3000,
    });
  }
  updated()
  {
    this.showSuccess('Enregistrement a été effectué avec succès.')
    this.getEcole();

  }

  getEcole(){

    this.idEcole = this.authService.getIdSelectedEcole();
    this.nomGroupe= this.authService.getNomGroupe();
    this.ecoleService.getEcolePrecis(this.idEcole,this.nomGroupe).subscribe(resp => {

      this.ecole=resp;
      this.color1=this.ecole.couleurBarreTache;
      this.color=this.ecole.couleurExterne;

      console.log("horaires",this.ecole.HorairesEcoles[6].estFermer)



    });

  }
}
