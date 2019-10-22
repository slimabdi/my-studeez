import { Component, OnInit , ViewEncapsulation,ViewChild, Input} from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import {GroupeAndRegroupingService} from '../../../../services/groupe-and-regrouping.service';
import {AuthService} from "../../../../services/auth.service";
import {InfermerieService} from '../../../../services/infermerie.service';
import {HttpClient} from "@angular/common/http";
import { Carnetsante } from '../../../../modelsDirecteurPlateform/carnetsante.model';
import {Carnetparclass} from  '../../../../modelsDirecteurPlateform/carnetparclass.model'
import {ExelDownloadService} from "../../../../services/exel-download.service";
import { SidebarCarnetSanteComponent } from './sidebar-carnet-sante/sidebar-carnet-sante.component'
import { Subject } from "rxjs";
declare var jsPDF: any;
// import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-carnetsante',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './carnetsante.component.html',
  styleUrls: ['./carnetsante.component.css']
})
export class CarnetsanteComponent implements OnInit {

  @ViewChild(SidebarCarnetSanteComponent) sidebar: SidebarCarnetSanteComponent

  refresh: Subject<any> = new Subject();
  private _opened: boolean = false;
  private _toggleSidebar() {
    this._opened = !this._opened;
  }
  sante:any=true
  classe:any=false;
  data : any =[];
    
    constructor(private route : Router , private http: HttpClient , public authservice:AuthService , private infermerie :InfermerieService ,private carnet:InfermerieService ,private students : GroupeAndRegroupingService , public exel:ExelDownloadService) { }
  car:any=[];
  events :any
  carn : any =[];
  dataMalade : any = [];
  datalistcarnet:any =[]
  carnetsante : any;
  type: any = "voir";
  course: any = {};
  mode: any
  ajoutlistecarnet :any
  classid:any
  ngOnInit() { 
    this.infermerie.getcarnet().subscribe(carn=>{
      this.carn = carn
      console.log("ecole",carn); 
    })
    
  }
  // showErr(message) {
  //   this.toastr.error(message, "Erreur !", {
  //     timeOut: 5000
  //   });
  // }
  // showSuccess(massage) {
  //   this.toastr.success(massage, "Succès !", {
  //     timeOut: 5000
  //   });
  // }
  refreshEvents() {
    this.events = [];
    this._opened=false
    this.infermerie.getcarnet().subscribe(carn=>{
      this.carn = carn
      console.log("ecole",carn); 
    })
  }

  canet(){
    this.classe=false;
    this.sante=true
  }


  getcarnet(id){
    this.classe=true;
    this.sante=false
    this.classid=id
      this.infermerie.geteleveobservation(id).subscribe(listecarnet=>{
        console.log("listecarnet",listecarnet);
        this.dataMalade = listecarnet
      })

  }


  
InitEleve(carnet){
  this.mode=='update'
    this.classe=true;
    this.sante=false
   this.sidebar.initSidebar(carnet.id)
  
}

  
onshowlistecarnet(passage){
  this.mode ="create"

    this.sidebar.prepare(this.classid)
  }


  generationPDFf() {

    this.http.get<Carnetparclass[]>(this.authservice.getSubDomain()+"/carnets/"+ this.authservice.getNomGroupe() + "/" +this.authservice.getIdSelectedEcole()).subscribe(eleves =>
    {
      var columns = [
        {title: "Nom de la classe  ", dataKey: "nomC"},
        {title: "Abrégé", dataKey: "abrege"},
        {title: " Nombre d/'élèves", dataKey: "nbCarnet"},
      ];
      var doc = new jsPDF('l', 'mm', [297, 210]);
      doc.autoTable(columns, eleves, {
        theme: 'grid',
        styles: {
          overflow: 'linebreak',
          fontSize: 7},
  
        margin: {top: 22},
        addPageContent: function(data) {
          doc.text("Liste des élèves malade",128,15);
        }
      });
  
      doc.autoPrint()
      doc.save('infermerie.pdf');
      //doc.output('dataurlnewwindow');
      doc.output('dataurlnewwindow','eleves.pdf');
      window.open(doc.output('bloburl'), '_blank');
    });
  
  }
  
exportationExcell(){
  let tab =[]
  for (let index = 0; index < this.carn.length; index++) {
    const element = this.carn[index];
    tab.push({
      'Nom de la classe ':element.nomC ,
      'Abrégé ':element.abrege ,
      'Nombre d\’élèves':element.nbCarnet,
    })
    console.log( this.carn);
    if(index==this.carn.length-1){

      this.exel.downloadExcel(tab,'passageinfermier_')
    }
  }
}

generationPDflist() {
 
 
    var columns = [
      {title: "Élève ", dataKey: "nom prenom", },
      {title: "Observations, traitements, recommendations particulières", dataKey: "observation"},
      {title: " Contact en cas d/’urgence", dataKey: "responsable1"},
      {title: " Télephone contact", dataKey: "tel1"},
    ];
    var doc = new jsPDF('l', 'mm', [297, 210]);
    doc.autoTable(columns, this.dataMalade, {
      theme: 'grid',
      styles: {
        overflow: 'linebreak',
        fontSize: 7},

      margin: {top: 22},
      addPageContent: function(data) {
        doc.text("Liste des élèves malade",128,15);
      }
    });

    doc.autoPrint()
    doc.save('carnet santé par éléve.pdf');
    //doc.output('dataurlnewwindow');
    doc.output('dataurlnewwindow','eleves.pdf');
    window.open(doc.output('bloburl'), '_blank');
  

}

}
