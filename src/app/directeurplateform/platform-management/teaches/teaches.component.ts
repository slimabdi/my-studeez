import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {CompteProService} from "../../../services/comptePro.service";
import {HttpClient} from "@angular/common/http";
import {ExelDownloadService} from "../../../services/exel-download.service";
import 'jspdf-autotable';
import {Enseignants} from "../../../modelsDirecteurPlateform/Enseignants.model.";
declare let jsPDF: any;
@Component({
  selector: 'app-teaches',
  templateUrl: './teaches.component.html',
  styleUrls: ['./teaches.component.css']
})
export class TeachesComponent implements OnInit
{
  data: any =[];
  ListClassesEnseignant: any =[];
  ListMatieresEnseignant: any =[];
  enseignant:Enseignants=new Enseignants();
  monecole:any='';
  mode: any = "create";
  constructor( public authservice:AuthService, public enseignantservice:CompteProService, public  http :HttpClient, public exel:ExelDownloadService)
  {

  }

  ngOnInit() {

   
    this.enseignantservice.getListEnseignantslsEcole().subscribe(resp => {
      this.data=resp;
    })


  }

  estNonVidee(chaine){
    if(chaine == null ||chaine==''){

      return false;
    }else{return true;}
  }

   public _opened: boolean = false;
   public _toggleSidebar() {
    this._opened = !this._opened;

  }
  getEnseignant(enseignant)
  {
    this.getClasseEnseignant(enseignant.id);
    this.getMatieresEnseignant(enseignant.id);
    this.enseignant=enseignant;
    this.mode = "update";
    console.log(" this.enseignant" + this.enseignant);
  }


  getClasseEnseignant(id)
  {
    console.log("id enseignant",id)
    this.enseignantservice.getClasseEnseignant(id).subscribe(res => {
     this.ListClassesEnseignant=res;
      console.log('this.ListClassesEnseignant',this.ListClassesEnseignant);

    });

  }
  getMatieresEnseignant(id)
  {
    console.log("id enseignant",id)
    this.enseignantservice.getMatieresEnseignant(id).subscribe(res => {
      this.ListMatieresEnseignant=res;
      console.log('this.ListMatieresEnseignant',this.ListMatieresEnseignant);

    });

  }



  generationPDF() {
  console.log("ecole"+this.authservice.getIdSelectedEcole());
  console.log('groupePDF'+this.authservice.getNomGroupe());
    this.http.get<Enseignants[]>(this.authservice.getSubDomain()+"/enseignants/"+this.authservice.getNomGroupe()+"/"+this.authservice.getIdSelectedEcole()).subscribe(enseignants =>
    {
      var columns = [
        {title: "Nom  ", dataKey: "nom"},
        {title: "Prenom", dataKey: "prenom"},
        {title: "Adresse", dataKey: "adressePostal"},
        {title: "Email", dataKey: "email"},
        {title: "Numéro de télèphone", dataKey: "tel1"},

      ];

      var doc = new jsPDF('l', 'mm', [297, 210]);
      doc.autoTable(columns, enseignants, {
        theme: 'grid',
        styles: {
          overflow: 'linebreak',
          fontSize: 7},

        margin: {top: 22},
        addPageContent: function(data) {
          doc.text("Liste des enseignants",128,15);
        }
      });

      doc.autoPrint()
      doc.save('enseignant.pdf');
      //doc.output('dataurlnewwindow');
      doc.output('dataurlnewwindow','ecoles.pdf');
      window.open(doc.output('bloburl'), '_blank');
    });

  }

  exportationEnseignantExcel(){
    let tab =[]
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      let nom;
      let email;
      let tel1;
      let prenom;
      let tel2;
      if(element.nom=='' || element.nom==null  )
        nom='----';
      else
        nom =element.nom;
      if(element.prenom=='' || element.prenom==null  )
        prenom='----';
      else
        prenom =element.prenom
      if(element.email=='' || element.email==null  )
        email='----';
      else
        email =element.email
      if(element.tel1=='' || element.tel1==null  )
        tel1='----';
      else
        tel1 =element.tel1
      if(element.tel2=='' || element.tel2==null  )
        tel2='----';
      else
        tel2 =element.tel2
      tab.push({
        'Nom':nom,
        'prenom':prenom,
        'Email':email,
        'Tel 1':tel1,
        'Tel 2':element.tel2
      })
      if(index==this.data.length-1){
        this.exel.downloadExcel(tab,'Enseignants '+this.authservice.getNomGroupe()+'_'+this.monecole)
      }
    }
  }

  supprimerEnseignant(id){
    console.log("idddd"+id);
  this.enseignantservice.deleteEnseignant(id).subscribe(resp => {
      this.enseignantservice.getListEnseignantslsEcole().subscribe(resp => {
        this.data=resp;
      });


    });
  }

}
