import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

import {AuthService} from "../../../../services/auth.service";
import {MatiereService} from "../../../../services/matiere.service";
import {Matieres} from "../../../../modelsDirecteurPlateform/Matieres.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-sidebarSubject',
  templateUrl: './sidebarSubject.component.html',
  styleUrls: ['./sidebarSubject.component.css']
})
export class SidebarSubjectComponent implements OnInit {
   @Input() matiere:Matieres=new Matieres();
   @Input() mode:any='create';
   @Output() data = new EventEmitter<boolean>();

  estOptionnelle:boolean=false;
  tmp: any = 1;
  selectedFile: File = null;
  icone: any = "";

  constructor(private matiereService: MatiereService,private authservice:AuthService,public http: HttpClient)
  {


  }

  ngOnInit()
  {

  }

  ajouterMatiere(matiere){
    matiere.icone=this.icone;

    if(this.mode=='create') {
      matiere.idE = this.authservice.getIdSelectedEcole();
      this.matiereService.AddMatiere(matiere).subscribe(resp => {
        //console.log(resp);

        this.data.emit(true);
      });
    }
    else if(this.mode=='update') {
      matiere.idEcole = this.authservice.getIdSelectedEcole();
      this.matiereService.updateMatiere(matiere).subscribe(resp => {
        this.data.emit(true);
      });
    }
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
        this.icone = res;
      });
  }


}
