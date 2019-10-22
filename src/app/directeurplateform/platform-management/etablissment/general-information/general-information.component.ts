import {Component, Input, OnInit} from '@angular/core';
import {Ecoles} from "../../../../modelsDirecteurPlateform/Ecoles.model";
import {AuthService} from "../../../../services/auth.service";
import {EcoleService} from "../../../../services/ecole.service";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.css']
})
export class GeneralInformationComponent implements OnInit {

  //@Input() ecole:Ecoles=new Ecoles();
  ecole: any = [];
  ready:any=true

  idEcole:any='';
  nomGroupe:any='';

  constructor(private authService:AuthService,private ecoleService :EcoleService,private  http :HttpClient, public toastr: ToastrService) {

    //this.nomGroupe=this.authService.getNomGroupe();
    this.getEcole();

  }

  ngOnInit() {

    console.log("ecoles",this.ecole)

  }


  updateInfoGenerale(ecole){
    console.log("formulaire",ecole)
    this.ecoleService.updateInfoGeneral(ecole).subscribe(resp => {
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
    console.log(" this.nomGroupe", this.nomGroupe)
    this.ecoleService.getEcolePrecis(this.idEcole,this.nomGroupe).subscribe(resp => {

      this.ecole=resp;


    });

  }

}
