import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { CompteProService } from "../../../services/comptePro.service";
import { HttpClient } from "@angular/common/http";
import { Personnels } from "../../../models/PersonnelDirecteur";
import { ExelDownloadService } from "../../../services/exel-download.service";
import "jspdf-autotable";
import { SidebarpersonnelscolaireComponent } from "./sidebarpersonnelscolaire/sidebarpersonnelscolaire.component";
declare let jsPDF: any;
import * as cloneDeep from "lodash/cloneDeep";

@Component({
  selector: "app-scolar-perso",
  templateUrl: "./scolar-perso.component.html",
  styleUrls: ["./scolar-perso.component.css"]
})
export class ScolarPersoComponent implements OnInit {
  @ViewChild(SidebarpersonnelscolaireComponent)
  sidebar: SidebarpersonnelscolaireComponent;

  data: any = [];
  PersoClasses: any = [];
  rang: any = [];

  term: any = "";
  monecole: any = "";
  personnel: Personnels = new Personnels();
  mode: any = "create";
  tmppersonnel: Personnels = new Personnels();
  constructor(
     public authservice: AuthService,
     public personnelservice: CompteProService,
     public http: HttpClient,
     public exel: ExelDownloadService
  ) {}

  getClasseParPersonnel(d) {
    this.PersoClasses = [];
    d.forEach(element => {
      this.personnelservice.getClasseParPersonnel(element.id).subscribe(res => {
        for (let i = 0; i < res.length; i++) {
          for (let j = 0; j < res[i].Classes.length; j++) {
            this.PersoClasses.push(res[i].Classes[j]);
          }
        }
      });
    });
  }

  getClasseParId(id) {
    this.rang = [];
    this.personnelservice.getClasseParPersonnel(id).subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        for (let j = 0; j < res[i].Classes.length; j++) {
          this.rang[j] = res[i].Classes[j].id;
        }
      }
    });
    console.log('this.rang',this.rang);
  }

  ngOnInit() {
    this.listPersonnel();
  }

  listPersonnel() {
    this.personnelservice.getListPersonnelsEcole().subscribe(resp => {
      this.data = resp;
      console.log(resp);

      this.getClasseParPersonnel(this.data);
    });
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
          "/personnels/" +
          this.authservice.getNomGroupe() +
          "/" +
          this.authservice.getIdSelectedEcole()
      )
      .subscribe(directeurs => {
        let columns = [
          { title: "Nom  ", dataKey: "nom" },
          { title: "Prenom", dataKey: "prenom" },
          { title: "Adresse", dataKey: "adressePostal" },
          { title: "Email", dataKey: "email" },
          { title: "Numéro de télèphone", dataKey: "tel1" }
        ];

        let doc = new jsPDF("l", "mm", [297, 210]);
        doc.autoTable(columns, directeurs, {
          theme: "grid",
          styles: {
            overflow: "linebreak",
            fontSize: 7
          },

          margin: { top: 22 },
          addPageContent: function(data) {
            doc.text("Liste des personnels", 128, 15);
          }
        });

        doc.autoPrint();
        doc.save("personnels.pdf");
        //doc.output('dataurlnewwindow');
        doc.output("dataurlnewwindow", "ecoles.pdf");
        window.open(doc.output("bloburl"), "_blank");
      });
  }

  exportationPersonnelExcel() {
    let tab = [];
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      let nom;
      let email;
      let tel1;
      let prenom;
      let tel2;
      if (element.nom == "" || element.nom == null) nom = "----";
      else nom = element.nom;
      if (element.prenom == "" || element.prenom == null) prenom = "----";
      else prenom = element.prenom;
      if (element.email == "" || element.email == null) email = "----";
      else email = element.email;
      if (element.tel1 == "" || element.tel1 == null) tel1 = "----";
      else tel1 = element.tel1;
      if (element.tel2 == "" || element.tel2 == null) tel2 = "----";
      else tel2 = element.tel2;
      tab.push({
        Nom: nom,
        prenom: prenom,
        Email: email,
        "Tel 1": tel1,
        "Tel 2": element.tel2
      });
      if (index == this.data.length - 1) {
        this.exel.downloadExcel(
          tab,
          "Personnels scolaire " +
            this.authservice.getNomGroupe() +
            "_" +
            this.monecole
        );
      }
    }
  }
   public _opened: boolean = false;
   public _toggleSidebar() {
    this._opened = !this._opened;
  }
  afficherIG() {
    this.sidebar.afficherIG();
  }
  initialiseSidebar() {
    this.personnel = new Personnels();
    this.personnel.accueil=true
    this.personnel.messagerieInt=true
    this.personnel.messagerieExt=true
    this.personnel.rdv=true
    this.personnel.calendrierScol=true
    this.personnel.docAdm=true
    this.personnel.docAdmRenvoy=true
    this.personnel.tabAff=true
    this.personnel.galerie=true
    this.personnel.emploi=true
    this.personnel.reservation=true
    this.personnel.cours=true
    this.personnel.traveauxARendre=true
    this.personnel.appelEnSalle=true
    this.personnel.suivieJustif=true
    this.personnel.bilanAbsence=true
    this.personnel.absencePersScol=true
    this.personnel.sanctions=true
    this.personnel.suivieEleves=true
    this.personnel.notes=true
    this.personnel.bilannotes=true
    this.personnel.conseilClasse=true
    this.personnel.bulletinsEleves=true
    this.personnel.bulletinsclasses=true
    this.personnel.infirmerie=true
    this.personnel.dictionnaire=true
    this.personnel.wiki=true
    this.personnel.drive=true
    this.personnel.office=true
    this.mode = "create";
    this.sidebar.viderControLeForm();
  }
  getPersonnel(perso) {
    this.getClasseParId(perso.id);
    this.personnel = cloneDeep(perso);
    this.mode = "update";
    console.log(" this.PersoClasses" + this.PersoClasses);
  }
  modalSupp(tmppersonnel) {
    console.log("modal supp  ", tmppersonnel);
    this.tmppersonnel = tmppersonnel;
  }

  supprimerPersonnel(id) {
    console.log("id supp  ", id);
    this.personnelservice.deletePersonnel(id).subscribe(resp => {
      this.personnelservice.getListPersonnelsEcole().subscribe(resp => {
        this.data = resp;
        this.getClasseParPersonnel(this.data);
      });
    });
  }
}
