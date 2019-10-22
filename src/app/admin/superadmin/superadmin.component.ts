import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
  Type,
  NgModule
} from "@angular/core";
import { EleveService } from "../../services/eleve.service";
import { EcoleService } from "../../services/ecole.service";
import { ClasseService } from "../../services/classe.service";
import { MatiereService } from "../../services/matiere.service";
import { AuthService } from "../../services/auth.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { CompteProService } from "../../services/comptePro.service";
import { HttpClient } from "@angular/common/http";
import { ExelDownloadService } from "../../services/exel-download.service";
import { Personnels } from "../../models/Personnels";
import { Ecoles } from "../../models/ecoles";
declare var jsPDF: any;
declare var $: any;

@Component({
  selector: "app-superadmin",
  templateUrl: "./superadmin.component.html",
  styleUrls: ["./superadmin.component.css"]
})
@NgModule({
  imports: [BrowserModule],
  declarations: [SuperAdminComponent],
  bootstrap: [SuperAdminComponent]
})
export class SuperAdminComponent implements OnInit {
  dateDeconx: any = "";
  valid: any = true;
  connectedUser: any = "";
  term: any = "";
  public dataEco: any = [];
  idEcole: any = "";
  nom: any = "";
  password2: any = "";
  tmpSuperAd: any = "";
  tel1: any = "";
  login: any = "";
  monecole: any = "";
  pathAvatarSuper: any = "";
  loader: any = true;
  successAdd: any = "";
  public data: any = [];
  selectModel: any = "";
  id: any = "";
  ecoles: any = [];
  ListeSuperAd: any = [];
  myobject: any = {};
  selectedFile: File = null;
  selectedEcole: string = "";
  list: any = [];
  listUp: any = [];
  myselectecole: any;
  Upmyselectecole: any;
  public invoiceForm: FormGroup;
  idCompteUser: any = "";
  prenom: any = "";
  avatar: any = "";
  civilite: any = "";
  fonction: any = "";
  estAdmin: any = "";
  excel: any = "";
  tel2: any = "";
  adressePostale: any = "";
  complement_adresse: any = "";
  ville;
  codePostal: any = "";
  email: any = "";
  password: any = "";
  pathupAvatarSuper: any = "";
  tmp: any = "";
  loadersave: any = false;
  error: any = false;
  constructor(
    private exel: ExelDownloadService,
    private eco: EcoleService,
    private authServ: AuthService,
    private http: HttpClient,
    private Cp: CompteProService,
    private _fb: FormBuilder
  ) {
    this.ListeSuperAd = [];
    console.log("vide");

    this.connectedUser = authServ.getConnectedUser();
    let dateValue = Date.parse(this.connectedUser["derniereCnx"]);
    this.dateDeconx = new Date(dateValue).toLocaleString();
    console.log("date deconx", this.connectedUser["derniereCnx"]);
  }
  initItemRows() {
    return this._fb.group({
      itemname: [""]
    });
  }

  addNewRow() {
    console.log(this.list);

    if (this.list.indexOf(this.myselectecole) <= -1) {
      if (this.myselectecole) {
        this.list.push(this.myselectecole);
        this.myselectecole = null;
        this.error = false;
      }
    } else {
      this.error = true;
    }
    console.log("MySelector:" + this.myselectecole);
  }

  upAddNewRow() {
    console.log(this.list);

    if (this.listUp.indexOf(this.Upmyselectecole) <= -1) {
      if (this.Upmyselectecole) {
        this.listUp.push(this.Upmyselectecole);
        this.Upmyselectecole = null;
        this.error = false;
      }
    } else {
      this.error = false;
    }
  }

  deleteRow(index: number) {
    let table = this.list;
    this.list = [];
    for (let i = 0; i < table.length; i++) {
      if (i != index) {
        this.list.push(table[i]);
      }
    }
  }

  upDeleteRow(index: number) {
    let table = this.dataEco;
    this.dataEco = [];
    for (let i = 0; i < table.length; i++) {
      if (i != index) {
        this.dataEco.push(table[i]);
      }
    }
  }

  upDeleteRow2(index: number) {
    let table = this.listUp;
    this.listUp = [];
    for (let i = 0; i < table.length; i++) {
      if (i != index) {
        this.listUp.push(table[i]);
      }
    }
  }

  estNonVidee(chaine) {
    if (chaine == "") {
      //console.log("La chaîne est vide");
      return false;
    } else {
      return true;
    }
  }

  selectEcole(event: any) {
    this.selectedEcole = event.target.value;
  }

  //upload image Avatar
  onAvatarSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    this.http
      .post(this.authServ.getSubDomain() + "/upload", fd)
      .subscribe(res => {
        console.log("res", res);
        this.pathAvatarSuper = res;
        const $ = window["$"];
        $(function() {
          $('[data-toggle="tooltip"]').tooltip({
            animated: "fade",
            placement: "right",
            html: true
          });
        });
      });
  }

  //upload image Avatar
  updateAvatar(event) {
    this.tmp = "tmp";
    this.selectedFile = <File>event.target.files[0];
    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    this.http
      .post(this.authServ.getSubDomain() + "/upload", fd)
      .subscribe(res => {
        console.log("res", res);
        this.pathupAvatarSuper = res;
      });
  }

  viewListSuperAdmin(selectModel) {
    this.loader = true;
    this.ecoles.forEach(element => {
      if (element.id == event) {
        this.monecole = element.nomE;
      }
    });

    this.authServ.setIdSelectedEcole(selectModel);
    this.ListeSuperAd = this.Cp.getListSuperAdminEcole().subscribe(res => {
      console.log(res);
      this.data = res;
      this.loader = false;
    });
  }
  isSelected(id) {
    if (id === Number(this.authServ.getIdSelectedEcole())) {
      return true;
    }
    return false;
  }

  ajouterSuperAdmin(superAdmins) {
    if (this.list.length > 0) {
      this.loadersave = true;

      this.valid = true;
      console.log("super", superAdmins);
      this.Cp.ajouterSuperAdmin(superAdmins).subscribe(res => {
        this.successAdd =
          "Nouveau superadmin «" + superAdmins.nom + "» enregistré";
        this.data = [];
        this.Cp.getListSuperAdminEcole().subscribe(res => {
          $("#AddSuperAd").modal("hide");
          console.log(res);
          this.ListeSuperAd = res;
          this.loadersave = false;
          this.data = res;
          this.loader = false;
        });
        setTimeout(() => {
          this.successAdd = " ";
        }, 5000);
      });
    } else {
      this.valid = false;
    }
  }

  modalSupp(tmpSuperAd) {
    this.tmpSuperAd = tmpSuperAd;
  }
  DeleteSueradmin(id) {
    this.Cp.deletePersonnel(id).subscribe(res => {
      this.Cp.getListSuperAdminEcole().subscribe(res => {
        this.data = res;
        console.log(this.data);
      });
    });
  }

  ModifierSuperAdmin(superAd) {
    if (this.listUp.length == 0 && this.dataEco == 0) {
      this.valid = false;
    } else {
      this.valid = true;
      console.log(superAd);
      this.ListeSuperAd = [];
      this.data = [];
      this.loadersave = true;
      this.Cp.updateSuperAdmin(superAd).subscribe(res2 => {
        $("#UpSuperAd").modal("hide");
        this.loadersave = false;
        this.loader = true;
        this.Cp.getListSuperAdminEcole().subscribe(res => {
          console.log(res);
          this.loader = false;
          this.data = res;
        });
      });
    }
  }

  editSupAd(
    idCompteUser,
    id,
    nom,
    prenom,
    avatar,
    civilite,
    fonction,
    estAdmin,
    tel1,
    tel2,
    adressePostale,
    complement_adresse,
    ville,
    codePostal,
    email,
    password
  ) {
    var indexAvatar = avatar.lastIndexOf("/");
    this.tmp = avatar.substr(0, indexAvatar);
    this.pathupAvatarSuper = avatar.substr(indexAvatar + 1);

    this.idCompteUser = idCompteUser;
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    // this.pathupAvatarSuper=avatar;
    this.civilite = civilite;
    this.fonction = fonction;
    this.estAdmin = estAdmin;
    this.tel1 = tel1;
    this.tel2 = tel2;
    this.adressePostale = adressePostale;
    this.complement_adresse = complement_adresse;
    this.ville = ville;
    this.codePostal = codePostal;
    this.email = email;
    this.password = password;
    this.password2 = password;
  }

  editEcole(id) {
    this.dataEco = [];
    this.http
      .get<Ecoles[]>(
        this.authServ.getSubDomain() +
          "/superadminEcole/" +
          this.authServ.getNomGroupe() +
          "/" +
          id
      )
      .subscribe(res => {
        this.dataEco = res;
        console.log(this.dataEco);
      });
  }

  //exportetion Excel
  exportationExcel() {
    let tab = [];
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      tab.push({
        Nom: element.nom || " ",
        Prenom: element.prenom || " ",
        Civilité: element.civilite || " ",
        Ville: element.ville || " ",
        Email: element.email || " ",
        Telephone: element.tel1 || " ",
        Fonction: element.fonction || " "
      });
      if (index == this.data.length - 1) {
        this.exel.downloadExcel(
          tab,
          "SuperAdmins_" + this.authServ.getNomGroupe() + "_" + this.monecole
        );
      }
    }
  }
  //imprimer pdf
  generationPDF() {
    this.http
      .get<[Personnels]>(
        this.authServ.getSubDomain() +
          "/superadmin/" +
          this.authServ.getNomGroupe() +
          "/" +
          this.authServ.getIdSelectedEcole()
      )
      .subscribe(perso => {
        console.log(perso);
        var columns = [
          { title: "Nom ", dataKey: "nom" },
          { title: "Prénom", dataKey: "prenom" },
          { title: "Civilité", dataKey: "civilite" },
          { title: "Fonction ", dataKey: "fonction" },
          { title: "Email", dataKey: "email" },
          { title: "Ville", dataKey: "ville" },
          { title: "Telephone ", dataKey: "tel1" }
        ];

        var doc = new jsPDF("l", "mm", [297, 210]);
        doc.autoTable(columns, perso, {
          theme: "grid",
          styles: {
            overflow: "linebreak",
            fontSize: 7
          },

          margin: { top: 22 },
          addPageContent: function(data) {
            doc.text("Liste des Superadmins", 128, 15);
          }
        });

        doc.autoPrint();
        doc.save(
          "SuperAdmins_" +
            this.monecole +
            " " +
            this.authServ.getNomGroupe() +
            ".pdf"
        );
        //doc.output('dataurlnewwindow');
        doc.output("dataurlnewwindow", "ecoles.pdf");
        window.open(doc.output("bloburl"), "_blank");
      });
  }

  ngOnInit() {
    const $ = window["$"];

    $(function() {
      $('[data-toggle="tooltipu"]').tooltip({
        animated: "fade",
        placement: "right",
        html: true
      });
    });

    this.invoiceForm = this._fb.group({
      itemRows: this._fb.array([this.initItemRows()])
    });

    this.authServ.getgroupe().subscribe(res => {
      console.log(res);
      this.selectModel = null;
      this.data = [];
      this.term = "";

      if (res.id && res.id != "null") {
        this.loader = true;
        this.selectModel = this.authServ.getIdSelectedEcole();
        if (this.selectModel) {
          this.ListeSuperAd = this.Cp.getListSuperAdminEcole().subscribe(
            res => {
              console.log(res);
              this.data = res;
              this.loader = false;
            }
          );
        }

        this.eco.getEcolesSimple(res.id).subscribe(res => {
          console.log(res);
          this.loader = false;
          this.ecoles = res;
        });
      } else {
        this.ecoles = [];
        this.data = [];
        this.loader = false;
      }
    });
  }

  Effacer_RechercheAdmin() {
    this.term = "";
  }
}
