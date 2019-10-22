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
import { Personnels } from "../../models/Personnels";
import { ExelDownloadService } from "../../services/exel-download.service";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { CompteProService } from "../../services/comptePro.service";

import "jspdf-autotable";
import { Classe } from "../../models/classes";
declare let jsPDF: any;

@Component({
  selector: "app-personnelscolaire",
  templateUrl: "./personnelscolaire.component.html",
  styleUrls: ["./personnelscolaire.component.css"]
})
@NgModule({
  imports: [BrowserModule],
  entryComponents: [],
  declarations: [PersonnelscolaireComponent],
  bootstrap: [PersonnelscolaireComponent]
})
export class PersonnelscolaireComponent implements OnInit {
  dateDeconx: any = "";
  connectedUser: any = "";
  tmppersonel: any = {};
  // déclaration des variables
  loader: any = false;
  i: number = 0;
  id: any = "";
  nom: any = "";
  isCheked: boolean;
  isCheked_messagerieInt: boolean;
  isCheked_messagerieExt: boolean;
  isCheked_rdv: boolean;
  isCheked_galerie: boolean;
  isCheked_reservation: boolean;
  isCheked_cours: boolean;
  isCheked_traveauxARendre: boolean;
  isCheked_appelEnSalle: boolean;
  isCheked_suivieJustif: boolean;
  isCheked_saisieJustif: boolean;
  isCheked_bilanAbsence: boolean;
  isCheked_absencePersScol: boolean;
  isCheked_sanctions: boolean;
  isCheked_suivieEleves: boolean;
  isCheked_notes: boolean;
  isCheked_bilannotes: boolean;
  isCheked_conseilClasse: boolean;
  isCheked_bulletinsEleves: boolean;
  isCheked_bulletinsclasses: boolean;
  isCheked_infirmerie: boolean;
  isCheked_calendrierScol: boolean;
  isCheked_docAdm: boolean;
  isCheked_docAdmRenvoy: boolean;
  isCheked_tabAff: boolean;
  isCheked_emploi: boolean;
  isCheked_dictionnaire: boolean;
  isCheked_wiki: boolean;
  isCheked_drive: boolean;
  isCheked_office: boolean;

  idE: any = "";
  pathavatar: any = "";
  avatar: any = "";
  prenom: any = "";
  notes: any = "";

  civilite: any = "";
  fonction: any = "";

  tel1: any = "";
  tel2: any = "";
  estAdmin: any;
  adressePostale: any = "";
  complement_adresse: any = "";
  ville: any = "";
  email: any = "";

  presentation: any = "";
  Classe: any;

  creePar: any = "";
  modifiePar: any = "";
  createdAt: any = "";
  updatedAt: any = "";
  affichClasses: any = [];
  rang: any = [];
  rangModif: any = [];
  isCheked_estAdmin: boolean;
  idCU: any = "";
  term: any = "";
  login: any = "";
  password: any = "";
  password2 = "";

  acceuil: any = "";
  bilannotes: any = "";
  conseilClasse: any = "";
  bulletinsEleves: any = "";
  infirmerie: any = "";
  bulletinsclasses: any = "";
  dictionnaire: any = "";
  wiki: any = "";
  drive: any = "";
  galerie: any = "";
  absencePersScol: any = "";
  office: any = "";
  messagerieInt: any = "";
  messagerieExt: any = "";
  rdv: any = "";
  sanctions: any = "";
  calendrierScol: any = "";
  docAdm: any = "";
  docAdmRenvoy: any = "";
  suivieEleves: any = "";
  tabAff: any = "";
  emploi: any = "";
  reservation: any = "";
  cours: any = "";
  traveauxARendre: any = "";
  appelEnSalle: any = "";
  suivieJustif: any = "";
  saisieJustif: any = "";
  code_postal: any = "";
  bilanAbsence: any = "";

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

  classes: any = {};

  empty = [];

  data: any = [];
  data2: any = [];
  hide = true;

  selectModel: any = null;
  successAdd: any = "";
  selectedFile: File = null;
  checkboxFlag: boolean = true;
  disabledbutton: any = "";
  Nomgroupe: any = "";
  monecole: any = "";
  tmp: any = "";
  error:any=false
  constructor(
    private _cfr: ComponentFactoryResolver,
    private personnelservice: CompteProService,
    private eleveService: EleveService,
    private ecoleService: EcoleService,
    private classeService: ClasseService,
    private matiereService: MatiereService,
    private authService: AuthService,
    private http: HttpClient,
    private exel: ExelDownloadService
  ) {
    this.connectedUser = authService.getConnectedUser();
    let dateValue = Date.parse(this.connectedUser["derniereCnx"]);
    this.dateDeconx = new Date(dateValue).toLocaleString();
  }

  ngOnInit() {
    console.log(this.loader)    
    this.authService.getgroupe().subscribe(res => {
      console.log(res.id);
      this.loader=false      
      this.data = [];
        if (res.id!='null'&&res.id) {
          this.loader = true;
          this.selectModel = this.authService.getIdSelectedEcole();
          if (this.selectModel) {
            this.personnelservice.getListPersonnelsEcole().subscribe(res => {
              this.data = res;
              this.loader = false;
            });
          }
          this.ecoleService.getEcoles(res.id).subscribe(res => {
            console.log(res);
            this.loader = false;
            this.ecoles = res;
            console.log(this.ecoles);
            
          });
    console.log(this.loader)    
          
        }
       else {
         
         this.loader=false
    console.log(this.loader)    
         
        this.ecoles=[]
        this.data=[]
        this.selectModel=null
       }
    });

  
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

  onavatarSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    this.http
      .post("http://admin.localhost:3000/api/upload", fd)
      .subscribe(res => {
        console.log("res", res);
        // (<HTMLInputElement>document.getElementById("path").value) = res.name;
        this.pathavatar = res;
      });
  }
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    this.http
      .post("http://admin.localhost:3000/api/upload", fd)
      .subscribe(res => {
        console.log("res", res);
        this.pathavatar = res;
      });
  }
  viewListPerso(event) {
    if (event != "null") {
      this.ecoles.forEach(element => {
        if (element.id == event) {
          this.monecole = element.nomE;
          this.nomE = element.nomE;
        }
      });

      this.loader = true;

      this.authService.setIdSelectedEcole(event);
      this.personnelservice.getListPersonnelsEcole().subscribe(res => {
        this.data = res;
        this.loader = false;
      });
    } else {
      this.data = [];
      this.monecole = null;
      this.nomE = null;
    }
  }

  ajouterClasse(Classe) {
    this.error=false    
    for (let i = 0; i < this.rang.length; i++) {
      if (Classe == this.rang[i]) {
        this.error=true
        return;
      }
    }
    this.rang.push(Classe);
    console.log(this.rang);

    this.i++;
  }
  suppClasse(ii) {
    this.i = ii;
    this.i--;

    this.rang.splice(this.i, 1);
  }

  viewListClasse(idecole) {
    this.loader = true;
    this.idE = idecole;
    console.log("groupe" + this.authService.getNomGroupe());
    this.http
      .get<Classe[]>(
        this.authService.getSubDomain() +
          "/classes/" +
          this.idE +
          "/" +
          this.authService.getNomGroupe()
      )
      .subscribe(res => {
        this.data2 = res;
        this.loader = false;
      });
  }

  ajouterPersonnelScolaire(personnel) {
    personnel.affichClasses = this.rang;

    this.personnelservice.ajouterPersonnel(personnel).subscribe(resp => {
      this.successAdd =
        "Nouveau personnel scolaire «" + personnel.nom + "» enregistré";
      this.personnelservice.getListPersonnelsEcole().subscribe(res => {
        this.data = res;
        this.loader = false;

      });
      setTimeout(() => {
        this.successAdd = " ";
      }, 5000);
    });
  }

  getPersonnel(
    id,
    avatar,
    civilite,
    nom,
    prenom,
    ecole,
    idEcole,
    fonction,
    admin,
    tel1,
    tel2,
    addresse,
    complement,
    ville,
    codeP,
    email,
    pwd,
    acceuil,
    messagerieInt,
    messagerieExt,
    rdv,
    calendrierScol,
    docAdm,
    docAdmRenvoy,
    tabAff,
    galerie,
    emploi,
    reservation,
    cours,
    traveauxARendre,
    appelEnSalle,
    suivieJustif,
    saisieJustif,
    bilanAbsence,
    absencePersScol,
    sanctions,
    suivieEleves,
    notes,
    bilannotes,
    conseilClasse,
    bulletinsEleves,
    bulletinsclasses,
    infirmerie,
    dictionnaire,
    wiki,
    drive,
    office
  ) {
    var indexAvatar = avatar.lastIndexOf("/");
    this.tmp = avatar.substr(0, indexAvatar);

    this.pathavatar = avatar.substr(indexAvatar + 1);

    this.id = id;
    //this.avatar=avatar;
    this.civilite = civilite;
    this.nom = nom;
    this.prenom = prenom;
    this.nomE = ecole;
    this.idEcole = idEcole;

    this.fonction = fonction;
    this.estAdmin = admin;
    this.tel1 = tel1;
    this.tel2 = tel2;
    this.adressePostale = addresse;
    this.complement_adresse = complement;
    this.ville = ville;
    this.code_postal = codeP;
    this.email = email;
    this.password = "";

    this.acceuil = acceuil;
    this.messagerieInt = messagerieInt;
    this.messagerieExt = messagerieExt;
    this.rdv = rdv;
    this.calendrierScol = calendrierScol;
    this.docAdm = docAdm;
    this.docAdmRenvoy = docAdmRenvoy;
    this.tabAff = tabAff;
    this.galerie = galerie;
    this.emploi = emploi;
    this.reservation = reservation;
    this.cours = cours;
    this.traveauxARendre = traveauxARendre;
    this.appelEnSalle = appelEnSalle;
    this.suivieJustif = suivieJustif;
    this.saisieJustif = saisieJustif;
    this.bilanAbsence = bilanAbsence;
    this.absencePersScol = absencePersScol;
    this.sanctions = sanctions;
    this.suivieEleves = suivieEleves;
    this.notes = notes;
    this.bilannotes = bilannotes;
    this.conseilClasse = conseilClasse;
    this.bulletinsEleves = bulletinsEleves;
    this.bulletinsclasses = bulletinsclasses;
    this.infirmerie = infirmerie;
    this.dictionnaire = dictionnaire;
    this.wiki = wiki;
    this.drive = drive;
    this.office = office;
    this.rang = [];
    this.viewListClasse(idEcole);

    this.personnelservice.getClasseParPersonnel(this.id).subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        for (let j = 0; j < res[i].Classes.length; j++) {
          this.rang[j] = res[i].Classes[j].id;
        }
      }
    });
  }

  modifierPersonnelScolaire(personnel) {
    personnel.affichClasses = this.rang;
    console.log(personnel);

    this.personnelservice.updatePersonnel(personnel).subscribe(resp => {
      console.log(resp);
      this.successAdd = "Personnel «" + personnel.nom + "» modifié";

      this.personnelservice.getListPersonnelsEcole().subscribe(res => {
        this.data = res;
      });
      setTimeout(() => {
        this.successAdd = " ";
      }, 5000);
    });
  }
  DeletePersonnel(id) {
    this.personnelservice.deletePersonnel(id).subscribe(res => {
      this.personnelservice.getListPersonnelsEcole().subscribe(res => {
        this.data = res;
      });
    });
  }
  Effacer_Recherche() {
    this.term = "";
  }

  modifierPersonnel(nom, prenom) {
    this.nom = nom;
    this.prenom = prenom;
  }
  modalSupp(tmppersonel) {
    console.log("modal supp  ", tmppersonel);
    this.tmppersonel = tmppersonel;
  }

  estNonVidee(chaine) {
    if (chaine == null || chaine == "") {
      //console.log("La chaîne est vide");
      return false;
    } else {
      return true;
    }
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

  viderForm() {
    this.isCheked = true;
    this.isCheked_messagerieInt = true;
    this.isCheked_calendrierScol = true;
    this.isCheked_docAdm = true;
    this.isCheked_docAdmRenvoy = true;
    this.isCheked_tabAff = true;
    this.isCheked_emploi = true;
    this.isCheked_dictionnaire = true;
    this.isCheked_wiki = true;
    this.isCheked_drive = true;
    this.isCheked_office = true;
    this.isCheked_estAdmin = false;

    this.avatar = "";
    this.civilite = "";
    this.nom = "";
    this.prenom = "";
    this.fonction = "";

    this.tel1 = "";
    this.tel2 = "";
    this.adressePostale = "";
    this.complement_adresse = "";
    this.ville = "";
    this.code_postal = "";
    this.email = "";
    this.password = "";
    this.password2 = "";

    this.pathavatar = "";
    this.avatar = "";
    this.acceuil = "";
    this.rang = [];
    this.idEcole=this.selectModel
  }

  viderForm2() {
    this.acceuil = 0;
    this.messagerieInt = 0;
    this.messagerieExt = 0;
    this.rdv = 0;
    this.calendrierScol = 0;
    this.docAdm = 0;
    this.docAdmRenvoy = 0;
    this.tabAff = 0;
    this.galerie = 0;
    this.emploi = 0;
    this.reservation = 0;
    this.cours = 0;
    this.traveauxARendre = 0;
    this.appelEnSalle = 0;
    this.suivieJustif = 0;
    this.saisieJustif = 0;
    this.bilanAbsence = 0;
    this.absencePersScol = 0;
    this.sanctions = 0;
    this.suivieEleves = 0;
    this.notes = 0;
    this.bilannotes = 0;
    this.conseilClasse = 0;
    this.bulletinsEleves = 0;
    this.bulletinsclasses = 0;
    this.infirmerie = 0;
    this.dictionnaire = 0;
    this.wiki = 0;
    this.drive = 0;
    this.office = 0;
  }

  generationPDF() {
    this.http
      .get<Personnels[]>(
        this.authService.getSubDomain() +
          "/personnels/" +
          this.authService.getNomGroupe() +
          "/" +
          this.authService.getIdSelectedEcole()
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
            this.authService.getNomGroupe() +
            "_" +
            this.monecole
        );
      }
    }
  }
}
