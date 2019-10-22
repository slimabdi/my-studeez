import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { CompteProService } from "../../../services/comptePro.service";
import { Personnels } from "../../../models/PersonnelDirecteur";
import { HttpClient } from "@angular/common/http";
import { ExelDownloadService } from "../../../services/exel-download.service";
import { SidebardirecteurComponent } from "./sidebardirecteur/sidebardirecteur.component";
import * as cloneDeep from "lodash/cloneDeep";
import { ToastrService } from 'ngx-toastr';

import "jspdf-autotable";
declare let jsPDF: any;
@Component({
  selector: "app-directeur",
  templateUrl: "./directeur.component.html",
  styleUrls: ["./directeur.component.css"]
})
export class DirecteurComponent implements OnInit {
  @ViewChild(SidebardirecteurComponent) sidebar: SidebardirecteurComponent;

  data: any = [];
  term: any = "";
  personnel: Personnels = new Personnels()
  tmpdirecteur: Personnels = new Personnels();
  ready: any = true;
  mode: any = "create";
  monecole: any;
  tmp = "";
  constructor(
     public authservice: AuthService,
     public directeurservice: CompteProService,
     public http: HttpClient,
     public exel: ExelDownloadService,
    private toastr: ToastrService    
     
  ) {}
  showSuccess(massage) {
    this.toastr.success( massage,'Succès !',{
      timeOut: 3000,
    });
  }
  updated(){
    this.showSuccess('Enregistrement a été effectué avec succès.')  
    this._toggleSidebar()
    this.listeDirecteur();
    
  }
  listeDirecteur() {

    this.directeurservice.getListDirecteursEcole().subscribe(resp => {
      console.log(resp);
      this.data = resp;
    });
  }
  ngOnInit() {
    this.listeDirecteur();
  
  }

  estNonVidee(chaine) {
    if (chaine == null || chaine == "") {
      return false;
    } else {
      return true;
    }
  }
  generationPDF() {
    this.http
      .get<Personnels[]>(
        this.authservice.getSubDomain() +
          "/directeurs/" +
          this.authservice.getNomGroupe() +
          "/" +
          this.authservice.getIdSelectedEcole()
      )
      .subscribe(directeurs => {
        var columns = [
          { title: "Nom  ", dataKey: "nom" },
          { title: "Prenom", dataKey: "prenom" },
          { title: "Adresse", dataKey: "adressePostal" },
          { title: "Email", dataKey: "email" },
          { title: "Numéro de télèphone", dataKey: "tel1" }
        ];

        var doc = new jsPDF("l", "mm", [297, 210]);
        doc.autoTable(columns, directeurs, {
          theme: "grid",
          styles: {
            overflow: "linebreak",
            fontSize: 7
          },

          margin: { top: 22 },
          addPageContent: function(data) {
            doc.text("Liste des directeurs", 128, 15);
          }
        });

        doc.autoPrint();
        doc.save("directeurs_"+this.authservice.getNomEcole()+".pdf");
        // //doc.output('dataurlnewwindow');
        // doc.output("dataurlnewwindow", "ecoles.pdf");
        // window.open(doc.output("bloburl"), "_blank");
      });
  }

  exportationDirecteurExcel() {
    let tab = [];
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      tab.push({
        Nom: element.nom||" ",
        prenom:  element.prenom||" ",
        Email: element.email||" ",
        "Tel 1": element.tel1||" ",
        "Tel 2": element.tel2||" "
      });
      if (index == this.data.length - 1) {
        this.exel.downloadExcel(
          tab,
          "Directeurs " + this.authservice.getNomGroupe() + "_" + this.authservice.getNomEcole()
        );
      }
    }
  }
   public _opened: boolean = false;
   public _toggleSidebar() {
    this._opened = !this._opened;
  }
  modalSupp(tmpdirecteur) {
    console.log("modal supp  ", tmpdirecteur);
    this.tmpdirecteur = tmpdirecteur;
  }
  supprimerDirecteur(id) {
    this.directeurservice.deletePersonnel(id).subscribe(res => {
    this.showSuccess('Enregistrement a été effectué avec succès.')        
      this.directeurservice.getListDirecteursEcole().subscribe(res => {
        this.data = res;
      });
    });
  }
  initialiseSidebar() {
    this.personnel = new Personnels();
    this.mode = "create";
    this.sidebar.viderControLeForm();
    this.personnel.estAdmin = true;
    this.personnel.messagerie = true;
  }
  initialiseSidebarModif() {
    this.personnel = new Personnels();
    this.mode = "update";
  }
  getDirecteur(directeur) {
    console.log("directeur" + directeur.nom);
    this.personnel = cloneDeep(directeur);
    console.log(this.personnel);
    this.mode = "update";
    this._toggleSidebar();
  }
}
