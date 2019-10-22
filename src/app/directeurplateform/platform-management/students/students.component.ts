import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {EleveService} from "../../../services/eleve.service"
import {Eleves} from "../../../modelsDirecteurPlateform/Eleves.model";
import {ExelDownloadService} from "../../../services/exel-download.service";
import {HttpClient} from "@angular/common/http";
import {Eleve} from "../../../models/eleve";
declare var jsPDF: any;
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {


  data: any = [];
  dataMatieres: any = [];
  isValid = true;
  term:any ='';
  eleve:Eleves=new Eleves();
  ready:any=true
  mode:any='create';
  monecole:any;

  name = 'slideToggle';
  id = '1';
  tmpeleve :any ='';
  checked = false;
  disabled = false;
  label = 'Toggle On/Off';
  labelledby = 'Some Other Text';

  view: string = 'month';


  constructor( public authservice:AuthService, public eleveservice:EleveService, public eleveService : EleveService, public  http :HttpClient, public exel:ExelDownloadService) { }

  ngOnInit() {

 
    this.eleveservice.getListElevesEcole().subscribe(resp => {
      this.data=resp;
      this.data.forEach(eleve => {
        if (eleve.Parents) {
          eleve.avatarParents = eleve.Parents.avatarParents;
          console.log("element.Parents",eleve.avatarParents)
        }
      });
    })




  }
  estNonVidee(chaine){
    if(chaine == "" || chaine== null){
      //console.log("La chaîne est vide");
      return false;
    }else{return true;}
  }

  initialiseSidebar(){
    this.eleve = new Eleves
    this.mode='create'
  }
  //
   public _opened: boolean = false;
   public _toggleSidebar() {
    this._opened = !this._opened;

  }
  modalSupp(tmpeleve){

    console.log(" is eleve supp",tmpeleve.id);
    this.tmpeleve=tmpeleve;
  }

  supprimerEleve(id){
    this.eleveService.deleteEleve(id).subscribe(res => {
      this.eleveService.getListElevesEcole().subscribe(res=>{
        this.data=res;
      })
    });
  }
  
  getEleve(eleve){

    this.eleve=eleve;
    console.log("eleve getEleve",eleve);
    this.getMatieresEleve(eleve.id);


    this.mode='update';

  }


  getMatieresEleve(id)
  {
    console.log("id eleve",id)
    this.eleveService.getMatiereEleve(id).subscribe(res => {
      this.dataMatieres=res;
     // console.log('this.dataMatieres',this.dataMatieres);

    });
  }
 exportationExcel(){
    let tab =[]
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      tab.push({
        'Nom ':element.nom ,
        'Prénom ':element.prenom ,
        'Classe':element.nomC,
        'Ecole':element.nomE,
      })
      if(index==this.data.length-1){
        this.exel.downloadExcel(tab,'Eleves_'+this.authservice.getNomGroupe()+'_'+this.monecole)
      }
    }
  }
  generationPDF() {

    this.http.get<Eleves[]>(this.authservice.getSubDomain()+"/elevesEcole/"+this.authservice.getNomGroupe()+"/7").subscribe(eleves =>
    {
      var columns = [
        {title: "Nom ", dataKey: "nom"},
        {title: "Prénom", dataKey: "prenom"},
        {title: "Classe", dataKey: "nomC"},
        {title: "Ecole", dataKey: "nomE"},
      ];
      var doc = new jsPDF('l', 'mm', [297, 210]);
      doc.autoTable(columns, eleves, {
        theme: 'grid',
        styles: {
          overflow: 'linebreak',
          fontSize: 7},

        margin: {top: 22},
        addPageContent: function(data) {
          doc.text("Liste des élèves",128,15);
        }
      });

      doc.autoPrint()
      doc.save('eleves.pdf');
      //doc.output('dataurlnewwindow');
      doc.output('dataurlnewwindow','eleves.pdf');
      window.open(doc.output('bloburl'), '_blank');
    });

  }
}
