import {Component, Input, OnInit} from '@angular/core';
import {Parents} from "../../../../modelsDirecteurPlateform/Parents.model";
import {ParentService} from "../../../../services/parent.service";
import {AuthService} from "../../../../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {EleveService} from "../../../../services/eleve.service";

@Component({
  selector: 'app-sidebarparent',
  templateUrl: './sidebarparent.component.html',
  styleUrls: ['./sidebarparent.component.css']
})
export class SidebarparentComponent implements OnInit {

  @Input() parent:Parents=new Parents();
  @Input() mode:any='create';

  tmpeleveParent :any ='';
  public listParentEleve: any = [];
  idEcole:any='';
  avatar:any='';
  tmp: any = 1;
  selectedFile: File = null;


  constructor( private parentService: ParentService, private eleveService: EleveService,private authservice:AuthService,private  http :HttpClient) {


    this.idEcole=authservice.getIdSelectedEcole();
  }

  ngOnInit() {

     this.parentService.getParentEleve(95).subscribe(res=>{

      this.listParentEleve=res
      //this.loader=false
    })
  }

  modifierParent(parent){
    parent.idE = this.idEcole;
    this.parentService.updateParent(parent);


  }
  estNonVidee(chaine){
    if(chaine == "" || chaine== null){
      //console.log("La chaîne est vide");
      return false;
    }else{return true;}
  }
  modalSupprimeEleve(tmpeleveParent){
    this.tmpeleveParent=tmpeleveParent;
  }

  deleteParentEleve(id) {
    this.eleveService.deleteEleve(id).subscribe(res => {
    });

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
        this.avatar = res;
      });
  }


}
