import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Ecoles} from "../../models/ecoles";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {
  dateDeconx: any='';
  connectedUser:any='';
  StatGroupeAndEcoles:any='';
  StatParent:any='';
  StatEleve:any='';
  StatGroupe:any='';
  StatEcole:any='';
  loader:any=false
  constructor( private authServ:AuthService,private http: HttpClient ) {
    this.connectedUser=authServ.getConnectedUser();
    console.log("grouuuuuuuuupe"+authServ.getNomGroupe());
    let dateValue=Date.parse( this.connectedUser['derniereCnx']);
    this.dateDeconx=new Date(dateValue).toLocaleString();
    console.log("date deconx",this.connectedUser['derniereCnx']);
    this.loader=true
    this.http.get<Ecoles[]>(this.authServ.getSubDomain()+"/statistique_Eleves").subscribe(res =>{
      console.log("result Eleveeeees:",res);
      this.StatEleve=res[0].nbrEleve;
      this.loader=false

    })
    this.http.get<Ecoles[]>(this.authServ.getSubDomain()+"/statistique_Parent").subscribe(res =>{
      console.log("result Parents:",res);
      this.StatParent=res[0].nbrParent;

    })

    this.http.get<Ecoles[]>(this.authServ.getSubDomain()+"/statistique_Ecoles_Groupes").subscribe(res =>{
      console.log("result Ecole et Groupe:",res);
      this.StatGroupe=res[0].nbrGroupe;
      this.StatEcole=res[0].nbrEcole;
    })

  }

  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(41,198,145,0.7)',
      borderColor: 'rgba(41,198,145,0.7)',
      pointBackgroundColor: 'rgba(41,198,145,0.7)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(41,198,145,0.7)'
    }
  ];

  chartOptions = {
    responsive: true
  };
color="#29c691"
  chartData = [

    { data: [10,20,10,0,50,50,0,80,90,50,30,60] },
  ];

  chartLabels = ['Septembre', 'Octobre', 'Novembre', 'Décembre','Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août'];

  onChartClick(event) {
    console.log(event);
  }

  ngOnInit() {


  }

}
