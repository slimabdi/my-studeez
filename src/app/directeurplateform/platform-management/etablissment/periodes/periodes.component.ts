import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {EcoleService} from "../../../../services/ecole.service";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {SidebarPeriodComponent} from "./sidebarPeriod/sidebarPeriod.component";
import {Ecoles} from "../../../../modelsDirecteurPlateform/Ecoles.model";

@Component({
  selector: 'app-periodes',
  templateUrl: './periodes.component.html',
  styleUrls: ['./periodes.component.css']
})
export class PeriodesComponent implements OnInit {


  ecole: any = {};
  idEcole:any='';

  nomGroupe:any='';

  _opened: any = false;

  protected
    :Ecoles=new Ecoles();
  ready:any=true
  mode:any='create';
  @ViewChild(SidebarPeriodComponent) sidebar: SidebarPeriodComponent;

  constructor(private authService:AuthService,private ecoleService :EcoleService,private  http :HttpClient, public toastr: ToastrService) {


    this.getEcole();
  }

  ngOnInit() {
  }


  _toggleSidebar() {
    this._opened = !this._opened;
  }

  initialiseSidebar()
  {
    //this.matiere = new Matieres
    this.mode='create'
  }


  updated()
  {
    this._toggleSidebar()
    this.getEcole();

  }
  getEcole(){

    this.idEcole = this.authService.getIdSelectedEcole();
    this.nomGroupe= this.authService.getNomGroupe();
    this.ecoleService.getEcolePrecis(this.idEcole,this.nomGroupe).subscribe(resp => {

      this.ecole=resp;


      console.log("decoupage",this.ecole.Decoupages[0].AnneeScolaire.dateDebut)



    });

  }

}
