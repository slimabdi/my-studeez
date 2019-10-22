import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  NgModule
} from "@angular/core";
import { EleveService } from "../../services/eleve.service";
import { EcoleService } from "../../services/ecole.service";
import { ClasseService } from "../../services/classe.service";
import { MatiereService } from "../../services/matiere.service";
import { AuthService } from "../../services/auth.service";

import { BrowserModule } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { CompteProService } from "../../services/comptePro.service";
import { Personnels } from "../../models/Personnels";

import "jspdf-autotable";
import { ExelDownloadService } from "../../services/exel-download.service";
declare var jsPDF: any;
@Component({
  selector: "app-directeur",
  templateUrl: "./directeur.component.html",
  styleUrls: ["./directeur.component.css"]
})
@NgModule({
  imports: [BrowserModule],
  bootstrap: [DirecteurComponent]
})
export class DirecteurComponent implements OnInit {
  // nouvelles declarations
  isCheked: boolean;
  dateDeconx: any = "";
  loader: any = false;
  // déclaration des variables
  id: any = "";
  avatar: any = "";
  nom: any = "";
  prenom: any = "";
  fonction: any = "";
  email: any = "";
  tel1: any = "";
  tel2: any = "";

  ville: any = "";
  code_postal: any = "";
  estAdmin: any;
  complement_d_adresse: any = "";
  INE: any = "";
  civilite: any = "";
  adressePostale: any = "";
  complement_adresse: any = "";

  presentation: any = "";

  creePar: any = "";
  modifiePar: any = "";
  createdAt: any = "";
  updatedAt: any = "";
  idCU: any = "";
  term: any = "";
  login: any = "";
  password: any = "";
  password2 = "";

  eleves: any = "";
  e: any = {};
  nomE: any = "";
  idEcole: any = "";
  idEleve: any = "";

  idCompteUser: any = "";
  ecoles: any = [];
  matieres: any = {};

  abrege: any = "";
  dateSortie: any = "";
  motifSortie: any = "";
  dateEntree: any = "";
  redoublant: any = "";
  provenance: any = "";

  nomMatiere: any = "";
  idMatiere: any = "";
  //count: any = '';
  classes: any = {};
  directeurs: any = [];

  pathavatar: any = "";
  empty = [];
  hide = true;

  selectModel: any = null;
  selectedFile: File = null;

  disabledbutton: any = "";
  checkboxFlag: boolean = true;
  tmpdirecteur: any = {};

  pathImagePageCx: any = "";
  successAdd: any = "";
  connectedUser: any = "";

  data: any = [];
  monecole: any = "";
  // Keep track of list of generated components for removal purposes
  components = [];

  tmp: any = "";

  constructor(
    private _cfr: ComponentFactoryResolver,
    private eleveService: EleveService,
    private directeurService: CompteProService,
    private ecoleService: EcoleService,
    private classeService: ClasseService,
    private matiereService: MatiereService,
    private authService: AuthService,
    private http: HttpClient,
    private exel: ExelDownloadService
  ) {
    this.directeurs = [];
    this.connectedUser = authService.getConnectedUser();
    let dateValue = Date.parse(this.connectedUser["derniereCnx"]);
    this.dateDeconx = new Date(dateValue).toLocaleString();
  }

  UploadDisable() {
    this.checkboxFlag = !this.checkboxFlag;
    console.log(this.checkboxFlag);
    if (this.checkboxFlag) {
      //si on choisir la personalisation par défaut alors on desactive les champs des uploads d'images
      this.disabledbutton = "disabledbutton"; //afectation de classe disabledbutton aux champs d'uploads
    } else {
      this.disabledbutton = "";
    }
  }
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    this.http
      .post("http://admin.localhost:3000/api/upload", fd)
      .subscribe(res => {
        console.log("res", res);
        this.pathImagePageCx = res;
      });
  }
  ngOnInit() {
    this.authService.getgroupe().subscribe(res => {
      console.log(res);
      this.data = [];
      if (res.id || this.selectModel) {
        if (res.id&&res.id!='null') {
          this.selectModel = this.authService.getIdSelectedEcole();
          if (this.selectModel) {
            this.loader = true;

            this.directeurService.getListDirecteursEcole().subscribe(res => {
              console.log(res);
              this.data = res;
              this.loader = false;
            });
          }
          this.ecoleService.getEcoles(res.id).subscribe(res => {
            console.log(res);
            this.loader = false;
            this.ecoles = res;
          });
        } else {
          this.selectModel=null
          this.ecoles = []
          this.loader = false;
          this.data=[]
        }
      }
    });

    const $ = window["$"];
  }

  ajouterDirecteur(personnel) {
    console.log("directeur")
    this.directeurService.ajouterDirecteur(personnel).subscribe(resp=> {
      this.successAdd = "Nouveau directeur «" + personnel.nom + "» enregistré";
      this.directeurService.getListDirecteursEcole().subscribe(res => {
        this.data = res;
        this.loader = false;
      });
      setTimeout(() => {
        this.successAdd = " ";
      }, 3000);
    })
  }

  modifierDirecteur(personnel) {
    this.directeurService.modifierDirecteur(personnel).subscribe(resp => {
      this.successAdd = "Mise à jours directeur «" + personnel.nom + "» enregistré";
      this.directeurService.getListDirecteursEcole().subscribe(res => {
        this.data = res;
        console.log(this.data);
      });
      setTimeout(() => {
        this.successAdd = " ";
      }, 3000);

    });
  }


  viewListDirecteurs(event) {
    if (event != "null") {
      this.ecoles.forEach(element => {
        if (element.id == event) {
          this.monecole = element.nomE;
          this.nomE = element.nomE;
        }
      });

      this.loader = true;
      this.authService.setIdSelectedEcole(event);

      this.idEcole = this.authService.getIdSelectedEcole();
      console.log("id ecole", this.authService.getIdSelectedEcole());
      this.directeurService.getListDirecteursEcole().subscribe(res => {
        console.log(res);
        this.data = res;
        this.loader = false;
      });
    } else {
      this.data = [];
      this.monecole = null;
      this.nomE = null;
    }
  }

  Effacer_Recherche() {
    this.term = "";
  }

  estNonVidee(chaine) {
    if (chaine == null || chaine == "") {
      //console.log("La chaîne est vide");
      return false;
    } else {
      return true;
    }
  }

  generationPDF() {
    this.http
      .get<Personnels[]>(
        this.authService.getSubDomain() +
        "/directeurs/" +
        this.authService.getNomGroupe() +
        "/" +
        this.authService.getIdSelectedEcole()
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
        doc.save("directeurs.pdf");
        //doc.output('dataurlnewwindow');
        doc.output("dataurlnewwindow", "ecoles.pdf");
        window.open(doc.output("bloburl"), "_blank");
      });
  }

  modalSupp(tmpdirecteur) {
    console.log("modal supp  ", tmpdirecteur);
    this.tmpdirecteur = tmpdirecteur;
  }

  DeleteDirecteur(id) {
    this.directeurService.deletePersonnel(id).subscribe(res => {
      this.directeurService.getListDirecteursEcole().subscribe(res => {
        this.data = res;
        console.log(this.data);
      });
    });
  }

  getDirecteur(
    id,
    avatar,
    civilite,
    nom,
    prenom,
    ecole,
    fonction,
    admin,
    tel1,
    tel2,
    addresse,
    complement,
    ville,
    codeP,
    email,
    pwd
  ) {
    var indexAvatar = avatar.lastIndexOf("/");
    this.tmp = avatar.substr(0, indexAvatar);
    //this.avatar=avatar.substr(indexAvatar+1);
    this.pathavatar = avatar.substr(indexAvatar + 1);
    console.log("aaa", this.avatar);
    console.log("tel", tel1);
    //this.icone=icone;
    this.id = id;
    //this.avatar=avatar;
    this.civilite = civilite;
    this.nom = nom;
    this.prenom = prenom;
    this.nomE = ecole;
    this.fonction = fonction;
    this.estAdmin = admin;
    this.tel1 = tel1;
    this.tel2 = tel2;
    this.adressePostale = addresse;
    this.complement_adresse = complement;
    this.ville = ville;
    this.code_postal = codeP;
    this.email = email;
    this.password = pwd;
  }
  viderForm() {
    this.avatar = "";
    this.civilite = "";
    this.nom = "";
    this.prenom = "";
    this.fonction = "";
    this.tel1 = "";
    this.tel2 = "";
    this.adressePostale = "";
    this.complement_d_adresse = "";
    this.ville = "";
    this.code_postal = "";
    this.email = "";
    this.password = "";
    this.password2 = "";
    this.pathavatar = "";
    this.isCheked = true;
  }
  viderDirecteur() {
    this.avatar = "";
    this.civilite = "";
    this.nom = "";
    this.prenom = "";
    this.idEcole = "";
    this.fonction = "";
    this.estAdmin = "";
    this.tel1 = "";
    this.tel2 = "";
    this.adressePostale = "";
    this.complement_adresse = "";
    this.ville = "";
    this.code_postal = "";
    this.email = "";
    this.password = "";
  }
  onupPhotoEtablissementSelected(event) {
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
        //appeler service d'upload l'image et retourner le nom comme resultat
        console.log("res", res);
        this.pathavatar = res;
      });
  }

  exportationDirecteurExcel() {
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
        Nom: nom||" ",
        prenom: prenom||" ",
        Email: email||" ",
        "Tel 1": tel1||" ",
        "Tel 2": element.tel2||" "
      });
      if (index == this.data.length - 1) {
        this.exel.downloadExcel(
          tab,
          "Directeurs " + this.authService.getNomGroupe() + "_" + this.monecole
        );
      }
    }
  }
}
