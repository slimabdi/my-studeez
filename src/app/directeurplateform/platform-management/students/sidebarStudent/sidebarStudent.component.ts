import {Component, OnInit, Input, Output} from '@angular/core';

import {AuthService} from "../../../../services/auth.service";
import {EleveService} from "../../../../services/eleve.service";
import {Eleves} from "../../../../modelsDirecteurPlateform/Eleves.model";
import {Classe} from "../../../../models/classes";
import {Matiere} from "../../../../models/matieres";
import {HttpClient} from "@angular/common/http";
import {EventEmitter} from "selenium-webdriver";

@Component({
  selector: 'app-sidebarStudent',
  templateUrl: './sidebarStudent.component.html',
  styleUrls: ['./sidebarStudent.component.css']
})
export class SidebarStudentComponent implements OnInit {


   @Input() eleve:Eleves=new Eleves();
   @Input() mode:any='create';
   @Input() dataMatieres;

    idEcole:any='';
    list:any=[];
    listUp:any=[];
    data:any=[];
    listParent:any=[];
  dataParents:any=[];

     tmp: any = 1;
     selectedFile: File = null;
    myselectmatiere:any='';
    selectedEmail: any ;
    selectedNom: any ;

    listClasses: any = [];
    listMatieresOptionnels: any = [];
 // public dataMatieres:any=[];

  constructor(private eleveService: EleveService,private authservice:AuthService,private  http :HttpClient) {

    this.idEcole=authservice.getIdSelectedEcole();
  }

  ngOnInit() {



    this.http.get<Classe[]>(this.authservice.getSubDomain() + "/classes/" + this.idEcole +"/"+ this.authservice.getNomGroupe()  ).subscribe(res => {
      this.listClasses = res;
    });
    this.http.get<Matiere[]>(this.authservice.getSubDomain() + "/matiereopts/" + this.idEcole +"/"+ this.authservice.getNomGroupe()  ).subscribe(res => {
      this.listMatieresOptionnels = res;
    });

    this.eleveService.getMatiereEleve(142).subscribe(res => {
      this.dataMatieres=res;

    });
    this.eleveService.getParentEleve(142).subscribe(res => {
      this.dataParents=res;

    });


  }
  ajouterEleve(eleve){
    eleve.nomE = this.idEcole;
    if(this.mode=='create') {

      this.eleveService.AddEleve(eleve);

    }
    else if(this.mode=='update')
    {


      this.eleveService.updateEleve(eleve);

    }
  }

  addNewRow()
  {
    this.list.push(this.myselectmatiere);
    this.myselectmatiere=null
  }

  deleteRow(index: number) {
    let table= this.list
    this.list=[]
    for(let i=0;i<table.length;i++){
      if(i!=index){
        this.list.push(table[i])
      }
    }
  }

  deleteRowUp(index: number) {
    let table= this.dataMatieres
    this.dataMatieres=[]
    for(let i=0;i<table.length;i++){
      if(i!=index){
        this.dataMatieres.push(table[i])
      }
    }
  }

  deleteRowParent(index: number) {
    let tableParent= this.listParent
    this.listParent=[]
    for(let i=0;i<tableParent.length;i++){
      if(i!=index){
        this.listParent.push(tableParent[i])
      }
    }
  }
  addNewParent() {
    console.log("this.selectedEmail", this.selectedEmail);

    this.listParent.push(this.selectedEmail);
    this.selectedEmail = null

  }
  selectNom (event: any)
  {
    this.selectedNom = event.target.value;
  }




  //upload image Avatar
  onAvatarSelected(event) {
    console.log(event.target.files[0]);
    this.tmp = "tmp";
    this.selectedFile = <File>event.target.files[0];
    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    this.http
      .post(this.authservice.getSubDomain() + "/upload", fd)
      .subscribe(res => {
        console.log("res", res);
        //  this.newclass.icone = res;
        this.data.avatar = res;
      });
  }

}
