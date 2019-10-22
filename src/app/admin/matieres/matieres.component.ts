import {
  Component,
  ComponentFactoryResolver,
  NgZone,
  OnInit,
  NgModule,
  ViewChild,
  ViewContainerRef,
  Type,
  ViewEncapsulation
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { MatiereService } from "../../services/matiere.service";
import { HttpClient } from "@angular/common/http";
import { EcoleService } from "../../services/ecole.service";
import { AuthService } from "../../services/auth.service";
import { FormGroup } from "@angular/forms";
import { Matiere } from "../../models/matieres";

import * as $ from "jquery";
import "jspdf-autotable";
import { ExelDownloadService } from "../../services/exel-download.service";
declare var jsPDF: any;
@Component({
  selector: "app-matieres",
  templateUrl: "./matieres.component.html",
  styleUrls: ["./matieres.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class MatieresComponent implements OnInit {
  id: any = "";
  idEcole: any = "";
  pathUpIcone: any = "";
  estOptionnelle: any = "";
  abrege: any = "";
  icone: any = "";
  isValid = true;
  nomMatiere: any = "";
  matieres: any = [];
  listMatieres: any = {};
  tmpmatiere: any = {};
  empty = [];
  pathIcone: any = "";
  selectModel: any = null;
  successAdd: any = "";
  term: any = "";
  selectedFile: File = null;
  ecoles: any = [];
  connectedUser: any = "";
  dateDeconx: any = "";
  myform: FormGroup;
  public data: any = [];
  myobject: any = {};
  loader: any = false;
  components = [];
  monecole: any = "";
  tmp: any = "";

  constructor(
    private exel: ExelDownloadService,
    private _cfr: ComponentFactoryResolver,
    private matiereService: MatiereService,
    private ecoleService: EcoleService,
    private http: HttpClient,
    private zone: NgZone,
    private authService: AuthService
  ) {
    this.matieres = [];
    this.connectedUser = authService.getConnectedUser();
    let dateValue = Date.parse(this.connectedUser["derniereCnx"]);
    this.dateDeconx = new Date(dateValue).toLocaleString();
    console.log("date deconx", this.dateDeconx);
  }

  ngOnInit() {
    this.authService.getgroupe().subscribe(res => {
      console.log(res);
      this.selectModel = null;
      this.data = [];
      if (res.id || this.selectModel) {
        if (res.id != "null") {
          this.ecoles = [];
          console.log(res.id);
          this.loader = true;
          this.selectModel = this.authService.getIdSelectedEcole();
          if (this.selectModel) {
            this.loader = true;
            this.matiereService.getMatieresEcole().subscribe(res => {
              console.log(res);
              this.data = res;
              this.data.forEach(element => {
                element.optionnelle = element.estOptionnelle ? "oui" : "non";
              });
              this.loader = false;
            });
          }
          // this.loader=true
          this.ecoleService.getEcoles(res.id).subscribe(res => {
            console.log(res);
            this.loader = false;
            this.ecoles = res;
          });
        } else {
          this.data = [];
          this.loader = false;
          this.ecoles = [];
        }
      }
    });
  }

  /////

  onIconeSelected(event) {
    const $ = window["$"];

    $(function() {
      $('[data-toggle="tooltip"]').tooltip({
        animated: "fade",
        placement: "right",
        html: true
      });
    });

    this.selectedFile = <File>event.target.files[0];

    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    this.http
      .post(this.authService.getSubDomain() + "/upload", fd)
      .subscribe(res => {
        console.log("res", res);
        // (<HTMLInputElement>document.getElementById("path").value) = res.name;
        this.pathIcone = res;
      });
  }
  uponIconeSelected(event) {
    this.tmp = "tmp";
    const $ = window["$"];

    $(function() {
      $('[data-toggle="tooltip"]').tooltip({
        animated: "fade",
        placement: "right",
        html: true
      });
    });

    this.selectedFile = <File>event.target.files[0];

    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    this.http
      .post(this.authService.getSubDomain() + "/upload", fd)
      .subscribe(res => {
        console.log("res", res);
        // (<HTMLInputElement>document.getElementById("path").value) = res.name;
        this.pathUpIcone = res;
      });
  }

  deleteMatiere(id) {
    this.matiereService.deleteMatiere(id).subscribe(res => {
      this.matieres = this.matiereService.getMatieresEcole().subscribe(res => {
        console.log(res);
        this.data = res;
        this.data.forEach(element => {
          element.optionnelle = element.estOptionnelle ? "oui" : "non";
        });
        this.loader = false;
      });
    });
  }

  modalSupp(tmpmatiere) {
    this.tmpmatiere = tmpmatiere;
  }

  ModalAfficheMatiere(id, idEcole, nomMatiere, abrege, estOptionnelle, icone) {
    this.id = id;
    this.idEcole = idEcole;
    console.log("idE", idEcole);
    this.nomMatiere = nomMatiere;
    this.abrege = abrege;
    this.estOptionnelle = estOptionnelle;

    var indexIcone = icone.lastIndexOf("/");
    this.tmp = icone.substr(0, indexIcone);
    this.pathUpIcone = icone.substr(indexIcone + 1);
    //this.icone=icone;
  }
  updateMatiere(matiere) {
    //console.log(matiere);
    this.matiereService.updateMatiere(matiere).subscribe(res => {
      this.successAdd =
        "Mise à jours matière «" + matiere.nomMatiere + "» enregistrée";
      this.viewListMatiers(this.selectModel);

      setTimeout(() => {
        this.successAdd = " ";
      }, 5000);
    });
  }

  AddMatiere(matiere) {
    console.log("matieres components ", matiere);

    this.matiereService.AddMatiere(matiere).subscribe(res => {
      this.successAdd =
        "Nouvelle matière «" + matiere.nomMatiere + "» enregistrée";
      this.viewListMatiers(this.selectModel);
      setTimeout(() => {
        this.successAdd = " ";
      }, 5000);
    });
  }

  estNonVidee(chaine) {
    if (chaine == "" || chaine == null) {
      //console.log("La chaîne est vide");
      return false;
    } else {
      return true;
    }
  }

  viewListMatiers(event) {
    this.ecoles.forEach(element => {
      if (element.id == event) {
        this.monecole = element.nomE;
      }
    });
    this.loader = true;
    this.authService.setIdSelectedEcole(event);

    this.idEcole = this.authService.getIdSelectedEcole();
    console.log("id ecole", this.authService.getIdSelectedEcole());
    this.matieres = this.matiereService.getMatieresEcole().subscribe(res => {
      console.log(res);
      this.data = res;
      this.data.forEach(element => {
        element.optionnelle = element.estOptionnelle ? "oui" : "non";
      });
      this.loader = false;
    });
  }

  isSelected(id) {
    if (id === Number(this.authService.getIdSelectedEcole())) {
      return true;
    }
    return false;
  }
  exportationExcel() {
    let tab = [];
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      tab.push({
        "Nom Matiere": element.nomMatiere || " ",
        abrege: element.abrege || " ",
        Obligatoire: element.estOptionnelle ? "Optionnelle" : "Obligatoire"
      });
      if (index == this.data.length - 1) {
        this.exel.downloadExcel(
          tab,
          "Matiers_" + this.authService.getNomGroupe() + "_" + this.monecole
        );
      }
    }
  }

  //imprimer pdf
  generationPDF() {
    var columns = [
      { title: "Nom matière ", dataKey: "nomMatiere" },
      { title: "Abrégé", dataKey: "abrege" },
      { title: "Optionnelle", dataKey: "optionnelle" }
    ];
    var doc = new jsPDF("l", "mm", [297, 210]);
    doc.autoTable(columns, this.data, {
      theme: "grid",
      styles: {
        overflow: "linebreak",
        fontSize: 7
      },

      margin: { top: 22 },
      addPageContent: function(data) {
        doc.text("Liste des Matiéres", 128, 15);
      }
    });

    doc.autoPrint();
    doc.save("matieres.pdf");
    //doc.output('dataurlnewwindow');
    doc.output("dataurlnewwindow", "ecoles.pdf");
    window.open(doc.output("bloburl"), "_blank");
  }
  Effacer_Recherche() {
    this.term = "";
  }
}
