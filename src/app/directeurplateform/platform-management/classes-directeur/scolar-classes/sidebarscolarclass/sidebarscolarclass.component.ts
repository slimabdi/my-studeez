import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output
} from "@angular/core";
import { ClasseService } from "../../../../../services/classe.service";
import { MatiereService } from "../../../../../services/matiere.service";
import { Matieres } from "../../../../../modelsDirecteurPlateform/Matieres.model";
import { AuthService } from "../../../../../services/auth.service";
import { HttpClient } from "@angular/common/http";
import { NgxInputFileUploadComponent } from "ngx-input-file-upload";
@Component({
  selector: "app-sidebarscolarclass",
  templateUrl: "./sidebarscolarclass.component.html",
  styleUrls: ["./sidebarscolarclass.component.css"]
})
export class SidebarscolarclassComponent implements OnInit {
  @ViewChild(NgxInputFileUploadComponent)
  private NgxInputFileUploadComponent: NgxInputFileUploadComponent;
  @Output() update = new EventEmitter<boolean>();

  decoupages: any = [];
  matieres: any = [];
  matieresss: any = [];
  enseignants: any = [];
  enseignantsp: any = [];
  coenseignants: any = [];
  niveaux: any = [];
  errclass: any = {};
  nivSelect: any = false;
  updateC: any = false;
  matiere: any = {};
  newclass: any = { matiere_ens: [], icone: "" };
  selectecole: any = 7;
  aff: any = [];
  tmp: any = 1;
  selectedFile: File = null;
  pathAvatarSuper: any = "";
  matloader;
  saving:any=false
  any = false;
  constructor(
    public http: HttpClient,
    public authService: AuthService,
    private matiereService: MatiereService,
    private classeService: ClasseService
  ) {
    console.log(
      "this.NgxInputFileUploadComponent",
      this.NgxInputFileUploadComponent
    );
  }

  ngOnInit() {
    this.getdecoupagelist();
    this.getmatieres();
    this.getenseignants();
    this.getniveaux();
  }
  //get liste de niveaux
  getniveaux() {
    this.classeService.getNiveau(this.selectecole).subscribe(res => {
      console.log("getniveaux", res);
      this.niveaux = res;
    });
  }
  //get decoupage list
  getdecoupagelist() {
    this.classeService.getDecoupages(this.selectecole).subscribe(res => {
      console.log("decoupages", res);
      this.decoupages = res;
    });
  }

  //get matieres list
  getmatieres() {
    this.matieresss = [];
    this.matiereService
      .getMatieresEcoleById(this.selectecole)
      .subscribe(res => {
        console.log("Matieres=> ", res);
        this.matieres = res;
        res.forEach(element => {
          this.matieresss.push({
            label: element.nomMatiere,
            value: element.id.toString()
          });
        });
        console.log(this.matieresss);
      });
  }

  //get list enseignants
  getenseignants() {
    this.classeService
      .getEnseignantsbyidecole(this.selectecole)
      .subscribe(res => {
        console.log("enseignants", res);
        this.enseignants = res;
        this.enseignantsp = res;
        this.coenseignants = res;
      });
  }

  addmat() {
    console.log(this.matiere);
    
    if (
      this.matiere.idMatiere &&
      this.matiere.coef &&
      this.matiere.co_enseig &&
      this.matiere.enseig
    ) {
      this.matiere.state = "create";
      this.newclass.matiere_ens.push(this.matiere);
      this.matiere = {};
    }
  }
  delete(i) {
    let tab = this.newclass.matiere_ens;
    this.newclass.matiere_ens = [];
    for (let index = 0; index < tab.length; index++) {
      const element = tab[index];
      if (i != index) {
        this.newclass.matiere_ens.push(element);
      } else {
        element.state = "delete";
        if (element.state != "create") {
          this.newclass.matiere_ens.push(element);
        }
      }
    }
  }
  showClassErrors() {
    this.errclass.errorExist = true;
    if (!this.newclass.nomC || this.newclass.nomC == "") {
      this.errclass.nomC = true;
      this.errclass.errorExist = false;
    } else {
      this.errclass.nomC = false;
    }
    if (!this.newclass.abrege || this.newclass.abrege == "") {
      this.errclass.abrege = true;
      this.errclass.errorExist = false;
    } else {
      this.errclass.abrege = false;
    }
    if (!this.newclass.lab) {
      this.errclass.lab = true;
      this.errclass.errorExist = false;
    } else {
      this.errclass.lab = false;
    }
    if (!this.newclass.idDecoupage) {
      this.errclass.idDecoupage = true;
      this.errclass.errorExist = false;
    } else {
      this.errclass.idDecoupage = false;
    }
    if (!this.newclass.formatNotation) {
      this.errclass.formatNotation = true;
      this.errclass.errorExist = false;
    } else {
      this.errclass.formatNotation = false;
    }
  }
  //create new class
  create() {
    if (
      (this.newclass.nomC || this.newclass.nomC == "") &&
      (this.newclass.abrege || this.newclass.abrege == "") &&
      this.newclass.lab &&
      this.newclass.idDecoupage &&
      this.newclass.formatNotation
    ) {
       this.saving=true   
      this.showClassErrors()
      if (this.updateC) {        
        this.updateClass();
      } else {
        this.newclass.icone = this.pathAvatarSuper;
        this.classeService.creerClasse(this.newclass).subscribe(res => {
          this.update.emit(true);
          this.errclass = {};
          this.saving=false
        });
      }
    } else {
      this.showClassErrors()
    }
  }

  //update class
  updateClass() {
    this.newclass.icone = this.pathAvatarSuper;
    this.classeService
      .updateClass(this.newclass.id, this.newclass)
      .subscribe(res => {
        this.updateC = false;
        this.update.emit(true);
        this.errclass = {};
        this.saving=false
      });
  }
  changeteacher(col) {
    if (col.state != "create") {
      col.state = "update";
    }
  }
  opencreateclasse() {
    this.updateC = false;
    this.newclass = { matiere_ens: [], icone: "" };
    this.matiere = {};
    this.saving=false    
  }
  openupdateclassModal(classe) {
    this.saving = false;
    console.log(classe);
    this.updateC = true;
    this.newclass = {
      id: classe.id,
      nomC: classe.nomC,
      abrege: classe.abrege,
      idDecoupage: classe.Decoupages.id
        ? classe.Decoupages.id.toString()
        : null,
      formatNotation: classe.formatNotation,
      icone: classe.icone,
      matiere_ens: []
    };

    var index = classe.icone.lastIndexOf("/");
    this.tmp = classe.icone.substr(0, index);
    this.pathAvatarSuper = classe.icone.substr(index + 1);

    this.matiere = {};

    if (classe.Sections && classe.Sections.libelleS) {
      this.newclass.section = classe.Sections.section;
      this.newclass.lab = classe.Sections.libelleS;
    } else {
      if (classe.Niveaux) {
        if (classe.Niveaux.niveau) {
          this.newclass.niveau = classe.Niveaux.niveau;
          this.newclass.lab = classe.Niveaux.libelleN;
        }
      }
    }
    this.matloader = true;
    this.newclass.matiere_ens = [];
    this.classeService.getmatClass(classe.id).subscribe(res => {
      if (this.newclass.matiere_ens.length > 0) {
        this.newclass.matiere_ens = [];
      }

      res.forEach(element => {
        this.newclass.matiere_ens.push({
          idMatiere: element.idMatiere,
          coef: element.coef,
          enseig: element.enseig ? element.enseig.id : null,
          co_enseig: element.co_enseig ? element.co_enseig.id : null,
          id: element.id
        });
      });
      this.matloader = false;
    });
    console.log(this.newclass);
  }

  //upload image Avatar
  onAvatarSelected(event) {
    console.log(event.target.files[0]);
    this.tmp = "tmp";
    this.selectedFile = <File>event.target.files[0];
    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    this.http
      .post(this.authService.getSubDomain() + "/upload", fd)
      .subscribe(res => {
        console.log("res", res);
        this.newclass.icone = res;
        this.pathAvatarSuper = res;
      });
  }
}
