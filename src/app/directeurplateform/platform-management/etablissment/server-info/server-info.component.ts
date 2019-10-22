import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {EcoleService} from "../../../../services/ecole.service";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-server-info',
  templateUrl: './server-info.component.html',
  styleUrls: ['./server-info.component.css']
})
export class ServerInfoComponent implements OnInit {


  ecole: any = {};
  idEcole:any='';
  nomGroupe:any='';

  myTrue : boolean = true;
  constructor(private authService:AuthService,private ecoleService :EcoleService,private  http :HttpClient, public toastr: ToastrService) {

    this.nomGroupe=this.authService.getNomGroupe();

    this.getEcole();
  }

  ngOnInit() {
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

    });

  }

  updateDonneeServeur(ecole){

    this.ecoleService.updateDonneeServeur(ecole).subscribe(resp => {
      this.ecole.emit(true);
    });

  }

}
