import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {ParentService} from "../../../services/parent.service"
import {Parents} from "../../../modelsDirecteurPlateform/Parents.model";
import {ExelDownloadService} from "../../../services/exel-download.service";
import {HttpClient} from "@angular/common/http";
declare var jsPDF: any;
@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css']
})
export class ParentsComponent implements OnInit {


  data: any = [];
  public dataMatieres: any = [];
  isValid = true;
  termP:any ='';
  parent:Parents=new Parents();
  ready:any=true
  mode:any='create';
  monecole:any;

  name = 'slideToggle';
  id = '1';
  tmpparent :any ='';
  checked = false;
  disabled = false;
  label = 'Toggle On/Off';
  labelledby = 'Some Other Text';

  view: string = 'month';
  idEcole:any='';

  constructor( public authservice:AuthService, public parentservice : ParentService, public  http :HttpClient, public exel:ExelDownloadService) {

    this.idEcole=authservice.getIdSelectedEcole();


  }

  ngOnInit() {
    this.parentservice.getListParentsEcole().subscribe(resp => {
      this.data=resp;

    })


  }
  estNonVidee(chaine){
    if(chaine == "" || chaine== null){
      //console.log("La chaîne est vide");
      return false;
    }else{return true;}
  }

  initialiseSidebar(){
    this.parent = new Parents
    this.mode='create'
  }
  //
   public _opened: boolean = false;
   public _toggleSidebar() {
    this._opened = !this._opened;

  }
  modalSupp(tmpparent){

    console.log(" is parent supp",tmpparent.id);
    this.tmpparent=tmpparent;
  }

  supprimerparent(id){
    this.parentservice.deleteParent(id).subscribe(res => {
      this.parentservice.getListParentsEcole().subscribe(res=>{
        this.data=res;
      })
    });
  }
  getParent(parent){

    this.parent=parent;
   // console.log("parent getparent",parent)
    this.mode='update';

  }
  exportationExcel(){
    let tab =[]
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      tab.push({
        'Nom ':element.nomP ,
        'Prénom ':element.prenomP ,
        'Email':element.emailP,
        'Télèphone':element.tel1,
        'Lien parenté':element.lienPrente,
      })
      if(index==this.data.length-1){
        this.exel.downloadExcel(tab,'Parents_'+this.authservice.getNomGroupe()+'_'+this.monecole)
      }
    }
  }
  generationPDF() {

    this.http.get<Parents[]>(this.authservice.getSubDomain()+"/ParentsEcole/"+this.authservice.getNomGroupe()+"/"+this.idEcole).subscribe(Parents =>
    {
      var columns = [
        {title: "Nom ", dataKey: "nomP"},
        {title: "Prénom", dataKey: "prenomP"},
        {title: "Email", dataKey: "emailP"},
        {title: "Télèphone", dataKey: "tel1"},
        {title: "Lien de parenté", dataKey: "lienPrente"},
      ];
      var doc = new jsPDF('l', 'mm', [297, 210]);
      doc.autoTable(columns, Parents, {
        theme: 'grid',
        styles: {
          overflow: 'linebreak',
          fontSize: 7},

        margin: {top: 22},
        addPageContent: function(data) {
          doc.text("Liste des parents",128,15);
        }
      });

      doc.autoPrint()
      doc.save('Parents.pdf');
      //doc.output('dataurlnewwindow');
      doc.output('dataurlnewwindow','Parents.pdf');
      window.open(doc.output('bloburl'), '_blank');
    });

  }
}
