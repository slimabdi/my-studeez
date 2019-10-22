import { Component, OnInit } from '@angular/core';
import {Ecoles} from "../../../modelsDirecteurPlateform/Ecoles.model";
import {AuthService} from "../../../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {ExelDownloadService} from "../../../services/exel-download.service";
import {EcoleService} from "../../../services/ecole.service";

@Component({
  selector: 'app-etablissment',
  templateUrl: './etablissment.component.html',
  styleUrls: ['./etablissment.component.css']
})
export class EtablissmentComponent implements OnInit {

 // ecole:Ecoles=new Ecoles();
  ecole: any = [];
  ready:any=true

  idEcole:any='';
  nomG:any='';



  constructor(private authService:AuthService,private ecoleService :EcoleService,private  http :HttpClient)
  {

    this.idEcole = authService.getIdSelectedEcole();

  }

  ngOnInit() {

     this.getEcole();

  }


  isactive(link){
    let path=(location.pathname).split('/')
    if(path[path.length-1]==link){
      return true
    }else{
      return (false)
    }
  }


  getEcole(){

    this.idEcole = this.authService.getIdSelectedEcole();
    this.nomG= this.authService.getNomGroupe();
    this.ecoleService.getEcolePrecis(this.idEcole,this.nomG).subscribe(resp => {

      this.ecole=resp;


    });

  }
}
