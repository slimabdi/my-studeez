import { Component, OnInit ,Output, Input , EventEmitter} from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import {GroupeAndRegroupingService} from '../../../../../services/groupe-and-regrouping.service';
import {AuthService} from "../../../../../services/auth.service";
import {InfermerieService} from '../../../../../services/infermerie.service';
import {HttpClient} from "@angular/common/http";
import { Infermerie } from '../../../../../modelsDirecteurPlateform/infermerie.model';
import {ExelDownloadService} from "../../../../../services/exel-download.service";
import {CarnetsanteComponent} from "../carnetsante.component"
@Component({
  selector: 'app-carnetliste',
  templateUrl: './carnetliste.component.html',
  styleUrls: ['./carnetliste.component.css']
})
export class CarnetlisteComponent implements OnInit {
  obj : any  = []
  constructor( private  liste : CarnetsanteComponent , private route : Router , private http: HttpClient , public authservice:AuthService , private infermerie :InfermerieService ,private carnet:InfermerieService ,private students : GroupeAndRegroupingService , public exel:ExelDownloadService) { }
  Listcarnet:any = [];
  ngOnInit() {
 console.log('tesssssssssst',this.liste.getcarnet)
  }
  voirlist(){
   
    this.infermerie.getcarnet().subscribe(Listcarnet=>{
      console.log("voir list ",Listcarnet);
      this.Listcarnet = Listcarnet
    })
   
  }

}
