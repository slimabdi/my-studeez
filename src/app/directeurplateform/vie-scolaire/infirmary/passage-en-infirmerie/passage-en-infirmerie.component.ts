import { Component, OnInit ,Output, Input , EventEmitter,ViewChild} from '@angular/core';
import {GroupeAndRegroupingService} from '../../../../services/groupe-and-regrouping.service';
import {AuthService} from "../../../../services/auth.service";
import {InfermerieService} from '../../../../services/infermerie.service';
import {HttpClient} from "@angular/common/http";
import { Infermerie } from '../../../../modelsDirecteurPlateform/infermerie.model';
import {ExelDownloadService} from "../../../../services/exel-download.service";
import {SidebarinfirmaryComponent} from "./sidebarinfirmary/sidebarinfirmary.component";
declare var jsPDF: any;

@Component({
  selector: 'app-passage-en-infirmerie',
  templateUrl: './passage-en-infirmerie.component.html',
  styleUrls: ['./passage-en-infirmerie.component.css'],
})
export class PassageEnInfirmerieComponent implements OnInit {
  @ViewChild(SidebarinfirmaryComponent) sidebar: SidebarinfirmaryComponent;
  data : any =[];
  elevecarnet : any =[];
  passage:any=true
  sante:any=false
  mylist:any={HEntree:{}}
  classe:any=false;
  course: any = {};
  type: any = "Cours";
  mode: any = "create";
  Malade:Infermerie=new Infermerie();
  dataMalade : any = [];
  infermerielist : any;
  observationeleve :any;
  currentcarnet: any = [];
  Listcarnet:any

  deletedobj:any={}

  private _opened: boolean = false;



  private _toggleSidebar() {
    this._opened = !this._opened;
  }

  constructor(private http: HttpClient , public authservice:AuthService , private infermerie :InfermerieService ,private carnet:InfermerieService ,private students : GroupeAndRegroupingService , public exel:ExelDownloadService) { }
  
  passageinfermier:any=[];

  ngOnInit() {
  this.getFList();

  }

  getFList(){
    this._opened=false
    this.passageinfermier=[]
    this.infermerie.getInfermerie().subscribe(x=>{
      this.passageinfermier= x;
      console.log("test",x); 
      console.log("test")
    });
  }

  initialiseSidebar(){
    this.passageinfermier = new Infermerie
    this.mode='create'
  }


  showForEdit(passage){
    console.log("eleve getEleve",passage);
    this.mode='update';
this.sidebar.prepare(passage)
  }

  showclass(){

  }

  getselecteleve(){
    console.log("id eleve",)
    this.infermerie.getidinfermier().subscribe(res => {
      this.dataMalade=res;
     // console.log('this.dataMatieres',this.dataMatieres);

    });
  }

  // showErr(message) {
   //this.toastr.error(message, "Erreur !", {
    // timeOut: 5000
    // });
  //}
  // showSuccess(massage) {
  //   this.toastr.success(massage, "Succès !", {
  //     timeOut: 5000
  //   });
  // }


  onDelete(id){
    this.infermerie.deleteInfermerie(id).subscribe(res => {
      // this.showSuccess('deleted')
      this.infermerie.getInfermerie().subscribe(res=>{
        this.passageinfermier=res;
      })
    });
  }
  
  generationPDF() {

    this.http.get<Infermerie[]>(this.authservice.getSubDomain()+"/infermerie/"+this.authservice.getNomGroupe()+"/"+this.authservice.getIdSelectedEcole()).subscribe(eleves =>
    {
      var columns = [
        {title: "Date ", dataKey: "date"},
        {title: "Arrivée", dataKey: "HEntree"},
        {title: "Départ", dataKey: "Hsortie"},
        {title: "Élève malade", dataKey: "nomClasse"},
        {title: "Accompagnateur", dataKey: "nomE"},
        {title: "Nom personnel", dataKey: "nomE"},
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
  
exportationExcel(){
  let tab =[]
  for (let index = 0; index < this.data.length; index++) {
    const element = this.data[index];
    tab.push({
      'Date ':element.date ,
      'Arrivée ':element.HEntree ,
      'Départ':element.Hsortie,
      'Classes':element.nomClasse,
      'Élève malade':element.nomClasse,
      'Accompagnateur':element.nomE,
      'Nom personnel':element.nomE,
    })
    if(index==this.data.length-1){
      this.exel.downloadExcel(tab,'infermerielist_'+this.authservice.getNomGroupe()+'_'+this.infermerielist)
    }
  }
}


}
