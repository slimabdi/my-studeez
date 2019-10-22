import { Component, OnInit ,Output, Input , EventEmitter} from '@angular/core';
import {GroupeAndRegroupingService} from '../../../services/groupe-and-regrouping.service';
import {AuthService} from "../../../services/auth.service";
import {InfermerieService} from '../../../services/infermerie.service';
import {HttpClient} from "@angular/common/http";
import { Infermerie } from '../../../modelsDirecteurPlateform/infermerie.model';
import {ExelDownloadService} from "../../../services/exel-download.service";
import { Carnetsante } from '../../../modelsDirecteurPlateform/carnetsante.model';
import { DatePipe } from '@angular/common';
import { elementAttribute } from '@angular/core/src/render3/instructions';
declare var jsPDF: any;
@Component({
  selector: 'app-infirmary',
  templateUrl: './infirmary.component.html',
  styleUrls: ['./infirmary.component.css'],
  providers : [InfermerieService],

})
export class InfirmaryComponent implements OnInit {
  elevecarnet : any =[];
  passage:any=true
  sante:any=false
  mylist:any={HEntree:{}}
  classe:any=false;
  course: any = {};
  type: any = "Cours";
  mode: any = "create";
  private _opened: boolean = false;
  Malade:Infermerie=new Infermerie();
  dataMalade : any = [];
  infermerielist : any;
  observationeleve :any;
  currentcarnet: any = [];
  Listcarnet:any
  showclass: any = true;
  private _toggleSidebar() {
    this._opened = !this._opened;
  }


  data: any = [
    {
      icon: 'nomicon.png' ,
      name: 'nom de l enseignant',
      class: 'CETA-CEB1-CM2C...+',
      mail: 'enseignant@gmail.com',
      telephone: '0670674927'
    },
    {
      icon: 'nomicon.png' ,
      name: 'nom de l enseignant',
      class: 'CETA-CEB1-CM2C...+', 
      mail: 'enseignant@gmail.com',
      telephone: '0670674927'
    },
    {
      icon: 'nomicon.png' ,
      name: 'nom de l enseignant',
      class: 'CETA-CEB1-CM2C...+',
      mail: 'enseignant@gmail.com',
      telephone: '0670674927'
    },
    {
      icon: 'nomicon.png' ,
      name: 'nom de l enseignant',
      class: 'CETA-CEB1-CM2C...+',
      mail: 'enseignant@gmail.com',
      telephone: '0670674927'
    },
    {
      icon: 'nomicon.png' ,
      name: 'nom de l enseignant',
      class: 'CETA-CEB1-CM2C...+',
      mail: 'enseignant@gmail.com',
      telephone: '0670674927'
    }
  ];
  constructor(  private http: HttpClient , public authservice:AuthService , private infermerie :InfermerieService ,private carnet:InfermerieService ,private students : GroupeAndRegroupingService , public exel:ExelDownloadService) { }
x:any=[];
car:any=[];
carn : any =[];
 
  ngOnInit() {
    this.infermerie.getInfermerie().subscribe(x=>{
      this.x= x;
      console.log("test",x); 
      console.log("test")
    });
this.infermerie.getcarnet().subscribe(carn=>{
  this.carn = carn
  console.log("ecole",carn); 
})

  }

 
  voirlist(){
    this.infermerie.getcarnet().subscribe(Listcarnet=>{
      console.log("voir list ",Listcarnet);
      this.Listcarnet = Listcarnet
    })
  }

  public disableButtonClick() {
    this.showclass = true;
  }

getcarnet(obj){
  this.classe=true;
  this.sante=false
 
    this.infermerie.geteleveobservation(obj.id).subscribe(listecarnet=>{
      console.log("listecarnet",listecarnet);
      this.dataMalade = listecarnet
    })


}
activeClass() {
  if (!this.showclass) {
    this.showclass = true;
  }
}

activeEns() {
  if (this.showclass) {
    this.showclass = false;
  }
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

exportationExcel2(){
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

}
