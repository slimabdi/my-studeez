import {
  Component,
  OnInit,
  NgZone,
  ElementRef,
  ViewChild,
} from "@angular/core";



import { GroupeScolaireService } from "../../services/groupe-scolaire.service";
import { HttpClient } from "@angular/common/http";
import { NgClass } from "@angular/common";
import * as $ from "jquery";
declare var jsPDF: any;
import { GroupeScolaires } from "../../models/groupe-scolaires";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { Globals } from "../../models/globals";
import "rxjs/add/operator/map";
import { ExelDownloadService } from "../../services/exel-download.service";
import { NgForm } from "@angular/forms";



@Component({
  selector: "app-groupe-scolaires",
  templateUrl: "./groupe-scolaires.component.html",
  styleUrls: ["./groupe-scolaires.component.css"],
})
export class GroupeScolairesComponent implements OnInit  {
  user: any = "";
  dateDeconx: any = "";
  id: any = "";
  nomG: any = "";
  nomBase: any = "";
  domaine: any = "";
  imagePageConx: any = "";
  logoPageConx: any = "";
  couleurExterne: any = "";
  logoBarreTache: any = "";
  couleurBarreTache: any = "";
  creePar: any = "";
  modifiePar: any = "";
  createdAt: any = "";
  updatedAt: any = "";
  groupes: any = "";
  tmpgroupe: any = ";";
  term: any = "";
  base: any = "";
  selectedFile: File = null;
  pathImagePageCx: any = "";
  upPathImagePageCx: any = "";
  pathLogoCx: any = "";
  upPathLogoCx: any = "";
  pathLogoBtache: any = "";
  upPathLogoBtache: any = "";
  erreurDomain: any = "";
  champDomaineOblig: any = "";
  champNomGOblig: any = "";
  champDomaineExist: any = "";
  successAdd: any = "";
  connectedUser: any = "";
  checkboxFlag: boolean = false;
  checkboxFlagm: boolean = false;
  disabledbutton: any = "";
  selectedcolorBarretache: any = "";
  upSelectedcolorBarretache: any = "";
  selectedcolorExtern: any = "";
  upSelectedcolorExtern: any = "";
  color: any = "";
  public data: any = [];
  tmp: any = "";
  tmp1: any = "";
  tmp2: any = "";
  personnalisationOblig: any = "";
validPers: any = "";

  upcolor: any = "";
  pathImagePageCxx: any = "";
  myobject: any = {};

  @ViewChild("hideModelAdd") hideModelAdd: ElementRef;
  @ViewChild("hideModelUpdate") hideModelUpdate: ElementRef;

  /////////////////////////////constructeur/////////////////////////////////////////////////////////////////

  constructor(
    private exel: ExelDownloadService,
    private authServ: AuthService,
    private router: Router,
    private zone: NgZone,
    private gpe: GroupeScolaireService,
    private http: HttpClient,
    private globals: Globals
  ) {
    this.groupes = gpe.getGroupeScolaires().subscribe(res => {
      this.data = res;
    });
    console.log("gp", this.groupes);

    ///////date deconnexion///////
    this.connectedUser = authServ.getConnectedUser();
    let dateValue = Date.parse(this.connectedUser["derniereCnx"]);
    this.dateDeconx = new Date(dateValue).toLocaleString();
  }

  /////////////////////////////////////////////////////////////////////////////////////////
  Effacer_Recherche() {
    this.term = "";
  }

  //////////////////////////////////////////////color picker//////////////////////////////////////////////////////////////////////
  onchangeColorExtern(e) {
    this.selectedcolorExtern = e;
  }
  onchangeColorBarreTache(e) {
    this.selectedcolorBarretache = e;
  }
  upOnchangeColorExtern(e) {
    this.upSelectedcolorExtern = e;
  }
  upOnchangeColorBarreTache(e) {
    this.upSelectedcolorBarretache = e;
  }

  ///////////////////////////////////validate/////////////////////////////////////////////////////////////////////////////////////////

  validSubdomain(domain) {
    var re = /[^a-zA-Z0-9\-]/;
    var val = domain;
    if (re.test(val)) {
      return false;
    } else {
      return true;
    }
  }
  /////////////////////////////////////generation du nom de base de donnée//////////////////////////////////////////////////////////////////////////////
  onKeyDomain(event) {
    this.base = event.target.value.concat(new Date().getTime());
  }

  ////////////////////////////////////////////////////////////////uploads/////////////////////////////////////////////////////////////////////
  /////////////////////////////////////upload image page connexion

  onFileSelected(event) {
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
      .post(this.authServ.getSubDomain() + "/upload", fd)
      .map((res: Response) => res)
      .subscribe(res => {
        this.pathImagePageCx = res;
      });
  }

  Effacer_Image_Page_Conx() {
    console.log("effacer");
    this.pathImagePageCx = "";
  }

  upOnFileSelected(event) {
    this.tmp = "tmp";

    this.selectedFile = <File>event.target.files[0];

    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    this.http
      .post(this.authServ.getSubDomain() + "/upload", fd)
      .subscribe(res => {
        this.upPathImagePageCx = res;
      });
  }
  /////////////////////////////////////////upload logo barre de tache

  onLogoBtacheSelected(event) {
    const $ = window["$"];
    $(function() {
      $('[data-toggle="tooltip2"]').tooltip({
        animated: "fade",
        placement: "right",
        html: true
      });
    });

    this.selectedFile = <File>event.target.files[0];

    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    this.http
      .post(this.authServ.getSubDomain() + "/upload", fd)
      .map((res: Response) => res)
      .subscribe(res => {
        this.pathLogoBtache = res;
      });
  }

  upOnLogoBtacheSelected(event) {
    this.tmp2 = "tmp";

    this.selectedFile = <File>event.target.files[0];

    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    this.http
      .post(this.authServ.getSubDomain() + "/upload", fd)
      .map((res: Response) => res)
      .subscribe(res => {
        console.log("res", res);
        this.upPathLogoBtache = res;
      });
  }

  //////////////////////////////////////////upload logo page connexion

  onLogoPageConxSelected(event) {
    const $ = window["$"];
    $(function() {
      $('[data-toggle="tooltip1"]').tooltip({
        animated: "fade",
        placement: "right",
        html: true
      });
    });

    this.selectedFile = <File>event.target.files[0];

    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);

    this.http
      .post(this.authServ.getSubDomain() + "/upload", fd)
      .map((res: Response) => res)
      .subscribe(res => {
        //appeler service d'upload l'image et retourner le nom comme resultat

        this.pathLogoCx = res;
      });
  }

  upOnLogoPageConxSelected(event) {
    this.tmp1 = "tmp";
    console.log("event",event);
    this.selectedFile = <File>event.target.files[0];
    console.log("file",  this.selectedFile );
    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);

    this.http
      .post(this.authServ.getSubDomain() + "/upload", fd)
      .map((res: Response) => res)
      .subscribe(res => {
        //appeler service d'upload l'image et retourner le nom comme resultat

        this.upPathLogoCx = res;
      });
  }

  /////////////////////////////////////////////////////////////////////////ajouter  groupe///////////////////////////////////////////////////////////////////////////////////

  AddGroupe(form: NgForm, groupe) {
    if(groupe.defaultPersonalisation == null) groupe.defaultPersonalisation=false;
    if(groupe.imagePageConx == null) groupe.imagePageConx='';
    if(groupe.logoBarreTache == null) groupe.logoBarreTache='';
    if(groupe. logoPageConx == null) groupe.logoPageConx='';


    groupe.couleurExterne=this.selectedcolorExtern;
    groupe.couleurBarreTache=this.selectedcolorBarretache;

    var domaine = groupe.domaine;


    if (groupe.domaine == "" || groupe.domaine == null) {
      this.champDomaineOblig = "Champ obligatoire";
      setTimeout(() => {
        this.champDomaineOblig = " ";
      }, 3000);
    }
    if (groupe.nomG == "" || groupe.nomG == null) {
      this.champNomGOblig = "Champ obligatoire";
      setTimeout(() => {
        this.champNomGOblig = " ";
      }, 3000);
    }
    /* if (!this.validSubdomain(domaine)) {
        this.erreurDomain = "nom de domain invalide";// afficher message erreur
        setTimeout(() => {
          this.erreurDomain = " ";
        }, 3000);
      }*/

   this.validPers=true;
    if(groupe.defaultPersonalisation == false&&(groupe.imagePageConx =="" ||groupe.logoPageConx =="" || groupe.logoBarreTache== ""|| groupe.couleurBarreTache=='#fff' || groupe.couleurExterne=='#fff')) {

      //if (groupe.defaultPersonalisation == false) {
        this.personnalisationOblig = 'Veuillez remplir toutes les personnalisation du groupe ou bien choisir la personalisation par défaut';
        this.validPers = false;
        setTimeout(() => {
          this.personnalisationOblig = " ";
        }, 3000);
      //}
    }
    if (groupe.domaine != "") {
      this.gpe.validateGroupe(groupe).subscribe(res => {
        // console.log("resss", res);
        // console.log("gisNull",res["nomGNull"])
        // console.log("disNull",res["domaineNull"])
       // console.log("valid", res["domaineValide"]);

        if (res["exist"] == "ok") {
          this.champDomaineExist = "Nom de domaine déjà existant";
          setTimeout(() => {
            this.champDomaineExist = " ";
          }, 3000);
        }
        if (res["domaineValide"] == "ko") {
          this.erreurDomain = "nom de domain invalide"; // afficher message erreur
          setTimeout(() => {
            this.erreurDomain = " ";
          }, 3000);
        }
        console.log("valid",this.validPers)
        if (this.validPers &&
          res["domaineValide"] == "ok" &&
          groupe.nomG != "" &&
          groupe.domaine != "" &&
          groupe.nomG != null &&
          groupe.domaine != null &&
          res["exist"] == "ko"
        ) {
          this.gpe.AddGroupeScolaire(groupe); // appel au service rest pour ajouter groupe


          setTimeout(()=>{
            this.successAdd = "Nouveau groupe «" + groupe.nomG + "» enregistré";

            this.groupes = this.gpe.getGroupeScolaires().subscribe(res => {
              this.data = res;
              this.authServ.setupdategroups(true)
            });
          },2000);
          setTimeout(()=>{
            this.successAdd=" ";
          },4000);

          form.resetForm(); // or form.reset();
          this.hideModelAdd.nativeElement.click();

        }
      });
    }
  }
  vider_form(form: NgForm) {
    form.resetForm();
    this.pathImagePageCx ='';
    this.pathLogoCx ='';
    this.pathLogoBtache ='';
    this.disabledbutton = '';
    this.selectedcolorExtern ='#fff';
    this.selectedcolorBarretache ='#fff';
    console.log("check",this.checkboxFlag)

  }
  /////////////////////////////////////////////////////edit groupe//////////////////////////////////////////////////////////////////
  editGroupe(groupe) {
    groupe.couleurExterne=this.upSelectedcolorExtern;
    groupe.couleurBarreTache=this.upSelectedcolorBarretache;
    var domaine = groupe.domaine;

    if (groupe.domaine == "") {
      this.champDomaineOblig = "Champ obligatoire";
      setTimeout(() => {
        this.champDomaineOblig = " ";
      }, 3000);
    }
    if (groupe.nomG == "") {
      this.champNomGOblig = "Champ obligatoire";
      setTimeout(() => {
        this.champNomGOblig = " ";
      }, 3000);
    }

    if (groupe.domaine != "") {
      this.gpe.validateGroupeUpdate(groupe).subscribe(res => {
        console.log("valid", res["domaineValide"]);

        if (res["exist"] == "ok") {
          this.champDomaineExist = "Nom de domaine déjà existant";
          setTimeout(() => {
            this.champDomaineExist = " ";
          }, 3000);
        }
        if (res["domaineValide"] == "ko") {
          this.erreurDomain = "nom de domain invalide"; // afficher message erreur
          setTimeout(() => {
            this.erreurDomain = " ";
          }, 3000);
        }
        if (
          res["domaineValide"] == "ok" &&
          groupe.nomG != "" &&
          groupe.domaine != "" &&
          res["exist"] == "ko"
        ) {
          this.hideModelUpdate.nativeElement.click();

          this.gpe.editGroupeScolaire(groupe);

          //console.log("component update",groupe);
          setTimeout(() => {
            this.successAdd = "Mise à jours parent «" + groupe.nomG + "» enregistré";

            this.groupes = this.gpe.getGroupeScolaires().subscribe(res => {
              this.data = res;
              this.authServ.setupdategroups(true)
            });
          }, 3000);

          setTimeout(()=>{
            this.successAdd=" ";
          },5000);
        }
      });
    }
  }

  //////////////////////////////////////////////////////////affichage ///////////////////////////////////////////////////////////////////////////
  modalEdit(
    id,
    base,
    nomG,
    domaine,
    couleurBarreTache,
    logoBarreTache,
    couleurExterne,
    logoPageConx,
    imagePageConx,
    defaultPersonalisation
  ) {
    this.id = id;
    this.nomG = nomG;
    this.domaine = domaine;
    this.nomBase = base;
    this.upSelectedcolorBarretache = couleurBarreTache;
    this.upSelectedcolorExtern = couleurExterne;

    var indexIPcx = imagePageConx.lastIndexOf("/");
    var indexLPx = logoPageConx.lastIndexOf("/");
    var indexLBt = logoBarreTache.lastIndexOf("/");

    this.tmp = imagePageConx.substr(0, indexIPcx);
    this.tmp1 = logoPageConx.substr(0, indexLPx);
    this.tmp2 = logoBarreTache.substr(0, indexLBt);

    this.upPathImagePageCx = imagePageConx.substr(indexIPcx + 1);
    this.upPathLogoCx = logoPageConx.substr(indexLPx + 1);

    this.upPathLogoBtache = logoBarreTache.substr(indexLBt + 1);

    this.checkboxFlagm = defaultPersonalisation;

    if (this.checkboxFlagm) {
      //si on choisir la personalisation par défaut alors on desactive les champs des uploads d'images
      this.disabledbutton = "disabledbutton"; //afectation de classe disabledbutton aux champs d'uploads
    } else {
      this.disabledbutton = "";
    }
  }

  modalSupp(tmpgroupe) {
    this.tmpgroupe = tmpgroupe;
  }
  ////////////////////////supprimer un groupe scolaire//////////////////////////////////////////////////////////////////////////////////////

  deleteGroupe(id, base) {
    this.gpe.deleteGroupeScolaire(id, base);
    setTimeout(() => {
      this.groupes = this.gpe.getGroupeScolaires().subscribe(res => {
        this.data = res;

        if(this.tmpgroupe.nomG==this.authServ.getNomGroupe()){
          this.authServ.destroyNomGroupe()
          this.authServ.setgroupe(null)
          this.authServ.setNomGroupe(null)
          this.authServ.destroyIdEcole()
        }
        this.authServ.setupdategroups(true);
      });
    }, 3000);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  estNonVide(chaine)
  {
    if (chaine == "" || chaine==null) {
      return false;
    } else {
      return true;
    }
  }

  /*///////////////////////////////////export excell////////////////////////////////////////////////*/

  generatePDF() {
    this.http
      .get<GroupeScolaires[]>(this.authServ.getSubDomain() + "/groupeScolaires")
      .subscribe(groupes => {
        var columns = [
          { title: "Nom", dataKey: "nomG" },
          { title: "Domaine", dataKey: "domaine" }
        ];

        var doc = new jsPDF("l", "mm", [297, 210]);
        doc.autoTable(columns, groupes, {
          theme: "grid",
          styles: {
            overflow: "linebreak",
            fontSize: 7
          },

          margin: { top: 22 },
          addPageContent: function(data) {
            doc.text("Liste des Groupes Scolaires", 128, 15);
          }
        });

        doc.autoPrint();
        doc.save("groupes.pdf");
        //doc.output('dataurlnewwindow');
        doc.output("dataurlnewwindow", "groupes.pdf");
        window.open(doc.output("bloburl"), "_blank");
      });
  }

  exportation() {
    let tab = [];
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      tab.push({
        "Nom Groupe": element.nomG||" ",
        domaine: element.domaine||" "
      });
      if (index == this.data.length - 1) {
        this.exel.downloadExcel(tab, "GroupeScolaire");
      }
    }
  }

  /************************personalisation par defaut*******************************/
  UploadDisable(type) {
    if(type==1) {

      this.checkboxFlag = !this.checkboxFlag;


      if (this.checkboxFlag) {
        //si on choisir la personalisation par défaut alors on desactive les champs des uploads d'images
        this.disabledbutton = "disabledbutton"; //afectation de classe disabledbutton aux champs d'uploads
      } else {
        this.disabledbutton = "";
      }
    }
    if(type==0) {
      this.checkboxFlagm = !this.checkboxFlagm;
      if (this.checkboxFlagm) {
        //si on choisir la personalisation par défaut alors on desactive les champs des uploads d'images
        this.disabledbutton = "disabledbutton"; //afectation de classe disabledbutton aux champs d'uploads
      } else {
        this.disabledbutton = "";
      }
    }
  }

  ///////////////////////////////////

  ngOnInit() {
    const $ = window["$"];

    $(function() {
      $('[data-toggle="tooltipu"]').tooltip({
        animated: "fade",
        placement: "right",
        html: true
      });
    });

    $(function() {
      $("#buttonAdd").click(function() {
        $(":input", "#g")
          .not(":button, :submit, :reset, :hidden ")
          .val("")
          .removeAttr("checked");

        $(":span", "#g").val("");
      });
    });
  }
}
