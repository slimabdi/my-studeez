import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {MatiereService} from "../../../services/matiere.service";
import{HttpClient} from '@angular/common/http';
import {ExelDownloadService} from "../../../services/exel-download.service";
import {Matieres} from "../../../modelsDirecteurPlateform/Matieres.model";
import { ToastrService } from 'ngx-toastr';

declare var jsPDF: any;
@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  data: any = [];
  isValid = true;
  term:any ='';
  tempmatiere:any ='';
  matiere:Matieres=new Matieres();
  ready:any=true
  mode:any='create';
  monecole:any;


  constructor( public authservice:AuthService, public matiereService : MatiereService, public  http :HttpClient, public exel:ExelDownloadService, public toastr: ToastrService)
  {
      this.getListMatieres();
  }

  ngOnInit()
  {



  }

  estNonVidee(chaine){
    if(chaine == "" || chaine== null){
      //console.log("La chaîne est vide");
      return false;
    }else{return true;}
  }

  initialiseSidebar()
  {
    this.matiere = new Matieres
    this.mode='create'
  }
  //
   public _opened: boolean = false;
   public _toggleSidebar() {
    this._opened = !this._opened;

  }

  showSuccess(massage) {
    this.toastr.success(massage, 'Succès !', {
      timeOut: 3000,
    });
  }
  updated()
  {
    this.showSuccess('Enregistrement a été effectué avec succès.')
    this._toggleSidebar()
    this.getListMatieres();

  }



  getListMatieres()
  {
    this.matiereService.getMatieresEcole().subscribe(res=>{
      this.data=res;
     // console.log("*******************************",this.data)
    })



  }

  supprimerMatiere(id){
    this.matiereService.deleteMatiere(id).subscribe(res => {
      this.getListMatieres();


    });
  }

  modalSupp(tempmatiere){

    this.tempmatiere=tempmatiere;
  }
  getMatiere(matiere){

    console.log("matiere"+matiere.nomMatiere);
    this.matiere=matiere;
    console.log(this.matiere)
    this.mode='update';

  }



  exportationExcel(){
    let tab =[]
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      tab.push({
        'Nom Matiere':element.nomMatiere,
        'abrege':element.abrege,
        'Obligatoire':(element.estOptionnelle?'Optionnelle':'Obligatoire')
      })
      if(index==this.data.length-1){
        this.exel.downloadExcel(tab,'Matiers_'+this.authservice.getNomGroupe()+'_'+this.authservice.getIdSelectedEcole())
      }
    }
  }
  generationPDF() {

    this.http.get<Matieres[]>(this.authservice.getSubDomain()+"/matieresEcole/"+this.authservice.getNomGroupe()+"/7").subscribe(matieres =>
    {
      var columns = [
        {title: "Nom matière ", dataKey: "nomMatiere"},
        {title: "Abrégé", dataKey: "abrege"},
        {title: "Optionnelle", dataKey: "estOptionnelle"},
      ];
      var doc = new jsPDF('l', 'mm', [297, 210]);
      doc.autoTable(columns, matieres, {
        theme: 'grid',
        styles: {
          overflow: 'linebreak',
          fontSize: 7},

        margin: {top: 22},
        addPageContent: function(data) {
          doc.text("Liste des Matiéres",128,15);
        }
      });

      doc.autoPrint()
      doc.save('matieres.pdf');
      //doc.output('dataurlnewwindow');
      doc.output('dataurlnewwindow','ecoles.pdf');
      window.open(doc.output('bloburl'), '_blank');
    });

  }

}
