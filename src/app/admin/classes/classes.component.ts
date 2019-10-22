import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ClasseService } from "../../services/classe.service";
import { MatiereService } from "../../services/matiere.service";
import { RequestOptions } from "@angular/http";
import { EcoleService } from "../../services/ecole.service";
import { AuthService } from "../../services/auth.service";
import { HttpClient } from "@angular/common/http";
import { Matiere } from "../../models/matieres";
import { DecoupageService } from "../../services/decoupage.service";
import { Classe } from "../../models/classes";
import { Enseignant } from "../../models/enseignants";
import { ExelDownloadService } from "../../services/exel-download.service";
import { IOption } from "ng-select";
import { elementAt } from "rxjs/operator/elementAt";
import { EmptyError } from "rxjs";
import * as cloneDeep from "lodash/cloneDeep";

declare var jsPDF: any;
declare var $: any;

@Component({
  selector: "app-classes",
  templateUrl: "./classes.component.html",
  styleUrls: [
    "../../../assets/scss/ng-select/ng-select.scss",
    "./classes.component.scss"
  ],
  encapsulation: ViewEncapsulation.None
})
export class ClassesComponent implements OnInit {
  public matieresss: Array<IOption> = [];
  aff: any = [];
  filterQuery: any = "";
  niverr: any = false;
  nivSelect: any = false;
  matListNiveau: any = [[]];
  errclass: any = {};
  id: any = "";
  successAdd: any = "";
  successAddNiv: any = "";
  abrege: any = "";
  nomC: any = "";
  sortable: any = false;
  updatework: any = false;
  icone: any = "";
  idDecoupage: any = "";
  libele: any = "";
  formatNotation: any = "";
  idE: any = "";
  createdAt: any = "";
  updatedAt: any = "";
  creePar: any = "";
  modifiePar: any = "";
  tmpclasse: any = {};
  decoupages: any = [];
  niveaux: any = [];
  ecoles: any = [];
  pathAvatarSuper: any = "";
  selectedFile: File = null;
  classes: any = [];
  listClasses: any = [];
  enseignants: any = [];
  enseignantsp: any = [];
  coenseignants: any = [];
  matieres: any = [];
  matiere: any = {};
  newclass: any = { matiere_ens: [], icone: "" };
  hide = true;
  ecoleNiv: any = [];
  data: any = [];
  matloader: any = false;
  divparent = {};
  class: any = true;
  connectedUser: any = "";
  dateDeconx: any = "";
  selectModel: any = null;
  monecole: any = "";
  loader: any = false;
  ngniv: any = 1;
  activeNiv: any = 0;
  saving: any = false;
  activeNivindex: any = 0;
  niveau: any = [];
  newmatrow: any = {};
  newsectionmatrow: any = [];
  shownewmatrow: any = false;
  shownewmatrowsec: any = [];
  open: any = [true];
  updateC: any = false;
  dis: any = false;
  sectionFordelete: any = { section: {} };
  monNivSecNew: any = [];
  indexSecActive: any = 1;
  loadernivpage: any = false;
  updateniveau: any = false;
  updateniveausec: any = false;
  createniveausec: any = false;
  secDelLoader: any = false; 
  tmp: any = 1;
  constructor(
    private excel: ExelDownloadService,
    private ecoleService: EcoleService,
    private classeService: ClasseService,
    private matiereService: MatiereService,
    private authService: AuthService,
    private http: HttpClient
  ) { 
    console.log("getClasses service");
    //date dernière connexion
    this.connectedUser = authService.getConnectedUser();
    let dateValue = Date.parse(this.connectedUser["derniereCnx"]);
    this.dateDeconx = new Date(dateValue).toLocaleString();
    console.log("date deconx", this.dateDeconx);
  }
  onDragSuccess(e) {
    console.log("onDragSuccess", e);
    this.ecoleNiv.forEach(element => {
      element.state = "update";
    });
  }
  resetpage() {
    this.sortable = false;
    this.loadernivpage = true;
    this.getNiveaux();
  }
  onClickedOutside() {
    console.log("hello");

    if (this.nivSelect) {
      this.nivSelect = false;
    }
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
  changeteacher(col) {
    if (col.state != "create") {
      col.state = "update";
    }
  }
  next() {
    this.niveau[this.activeNiv].err = false;
    this.niveau.err = false;
    if (this.niveau[this.activeNiv].name == "") {
      this.niverr = true;
      this.niveau[this.activeNiv].err = true;
    } else {
      this.niverr = false;
    }
    this.niveau[this.activeNiv].sections.forEach(element => {
      if (element.name == "") {
        element.err = true;
        this.niveau[this.activeNiv].err = true;
        this.niveau.err = true;
      } else {
        element.err = false;
      }
    });
    if (!this.niveau[this.activeNiv].err) {
      this.activeNiv++;
      this.activeNivindex++;
    }
  }
  precedent() {
    this.niveau[this.activeNiv].err = false;
    this.niveau.err = false;
    if (this.niveau[this.activeNiv].name == "") {
      this.niverr = true;
      this.niveau[this.activeNiv].err = true;
    } else {
      this.niverr = false;
    }
    this.niveau[this.activeNiv].sections.forEach(element => {
      if (element.name == "") {
        element.err = true;
        this.niveau[this.activeNiv].err = true;
        this.niveau.err = true;
      } else {
        element.err = false;
      }
    });
    if (!this.niveau[this.activeNiv].err) {
      this.activeNiv--;
      this.activeNivindex--;
    }
  }
  initNiv(nb) {
    if (this.selectModel) {
      if (nb) {
        this.ngniv = nb;
        this.niverr = false;
        this.niveau = [];
        let element = {
          name: "",
          matieres: [],
          sections: []
        };
        this.matListNiveau = [];
        this.activeNiv = 0;
        this.activeNivindex = 0;
        for (let index = 0; index < nb; index++) {
          this.niveau.push({
            name: "",
            matieres: [],
            sections: []
          });
        }
        console.log(this.niveau);
      }
      this.updateniveau = false;
      this.updateniveausec = false;
      this.createniveausec = false;
      $("#modalAddNiveau").modal("show");
    }
  }
  showselected(index) {
    
    // this.niveau[index].matieres = [];
    console.log(this.matListNiveau[index]);
    let length=this.matListNiveau[index].length
      this.niveau[index].matieres.push({ idmat: this.matListNiveau[index][length-1], coef: "" });
      console.log( this.niveau[index].matieres);
      
  }
  removed(index,event){
    console.log(this.matListNiveau[index]);
    console.log(event);
    let tab =this.niveau[index].matieres
    this.niveau[index].matieres=[]
    tab.forEach(element => {
      if(element.idmat!=event.value){
        this.niveau[index].matieres.push(element)      }
    });
  }
  addmatniv(activindex) {
    this.niveau[activindex].state = "update";
    this.niveau[activindex].matieres.push({
      idmat: this.newmatrow.idmat,
      coef: this.newmatrow.coef,
      id: this.newmatrow.id,
      state: "create"
    });
    let tab=this.matListNiveau[activindex]
    this.matListNiveau[activindex]=[]
    tab.forEach(element => {
      this.matListNiveau[activindex].push(element)
    });
    this.matListNiveau[activindex].push( this.newmatrow.idmat)
    
    console.log( this.newmatrow.idmat);
    console.log( this.matListNiveau[activindex]);

    this.shownewmatrow = false;
  }
  addmatnivTosection(section, i) {
    if (!this.createniveausec) {
      section.state = "update";
    }
    section.matieres.push({
      idmat: this.newsectionmatrow[i].idmat,
      coef: this.newsectionmatrow[i].coef,
      state: "create"
    });
    this.shownewmatrowsec[i] = false;
  }

  opencreateclasse() {
    this.saving = false;
    this.updateC = false;
    this.newclass = { matiere_ens: [], icone: "" };
    this.matiere = {};
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
  deleteSectionFromNivModal(section, activeNivpage, i) {
    this.secDelLoader = true;
    if (this.sectionFordelete.section.state != "create") {
      this.classeService.candeleteSection(section.id).subscribe(res => {
        console.log(res);
        if (res == "accept") {
          section.delete = true;
        }
        this.secDelLoader = false;
        this.sectionFordelete.section.state = "delete";
        this.sectionFordelete = {
          section: cloneDeep(section),
          niveau: activeNivpage,
          index: i
        };
      });
    } else {
      this.secDelLoader = false;
      this.sectionFordelete = {
        section: cloneDeep(section),
        niveau: activeNivpage,
        index: i
      };
    }
  }
  deleteSecFromNiv() {
    this.ecoleNiv[this.sectionFordelete.niveau].state = "update";
    if (this.sectionFordelete.section.state != "create") {
      this.sectionFordelete.section.state = "delete";
      this.ecoleNiv[this.sectionFordelete.niveau].sections[
        this.sectionFordelete.index
      ] = cloneDeep(this.sectionFordelete.section);
      console.log(this.ecoleNiv[this.sectionFordelete.niveau].sections);
    } else {
      let sectionNew = this.ecoleNiv[this.sectionFordelete.niveau].sections;
      this.ecoleNiv[this.sectionFordelete.niveau].sections = [];
      for (let index = 0; index < sectionNew.length; index++) {
        const element = sectionNew[index];
        if (index != this.sectionFordelete.index) {
          this.ecoleNiv[this.sectionFordelete.niveau].sections.push(element);
        }
      }
    }
  }
  openupdateNiv(activeNivpage) {
    this.activeNiv = 0;
    this.niverr = false;
    this.niveau = [cloneDeep(this.ecoleNiv[activeNivpage])];
    this.updateniveau = true;
    this.updateniveausec = false;
    this.createniveausec = false;
    this.activeNivindex = activeNivpage;
  }
  openupdateNivsec(activeNivpage, i) {
    this.activeNiv = 0;
    this.niverr = false;
    this.niveau = [cloneDeep(this.ecoleNiv[activeNivpage])];
    console.log(this.ecoleNiv[activeNivpage]);
    console.log(this.niveau);
    this.updateniveau = false;
    this.updateniveausec = true;
    this.createniveausec = false;
    this.activeNivindex = activeNivpage;

    this.open = [];
    for (let index = 0; index < this.niveau[0].sections.length; index++) {
      const element = this.niveau[0].sections[index];
      if (i == index) {
        this.open.push(true);
      } else {
        this.open.push(false);
      }
      this.shownewmatrowsec[i] = false;
      this.newsectionmatrow[i] = {};
    }
  }
  addSection(index) {
    this.niveau[index].sections.push({
      name: "",
      matieres: []
    });
    this.open.push(true);
    this.newsectionmatrow.push({});
    this.shownewmatrowsec.push(true);
  }
  addSectiontoNiv() {
    this.niverr = false;
    this.monNivSecNew[0].err = false;
    if (this.monNivSecNew[0].name == "") {
      this.niverr = true;
      this.monNivSecNew[0].err = true;
    }
    if (this.monNivSecNew[0].sections[0].name == "") {
      this.monNivSecNew[0].sections[0].err = true;
      this.monNivSecNew[0].err = true;
    } else {
      this.monNivSecNew[0].sections[0].err = false;
    }
    this.monNivSecNew[0].sections[0].delete = true;
    if (!this.monNivSecNew[0].err) {
      this.ecoleNiv[this.activeNivindex].sections.push(
        this.monNivSecNew[0].sections[0]
      );
      this.ecoleNiv[this.activeNivindex].state = "update";
      console.log(this.ecoleNiv[this.activeNivindex]);
      $("#modalAddNiveau").modal("hide");
    }
  }
  openupdateNivNewsec(activeNivpage) {
    this.updateniveau = false;
    this.updateniveausec = false;
    this.createniveausec = true;
    this.activeNiv = 0;
    this.open = [true];
    this.monNivSecNew = [
      {
        name: this.ecoleNiv[activeNivpage].name,
        sections: [
          {
            name: "",
            matieres: [],
            state: "create"
          }
        ]
      }
    ];
    this.activeNivindex = activeNivpage;
    this.indexSecActive = this.ecoleNiv[activeNivpage].sections.length + 1;
    this.newsectionmatrow = [{}];
    this.shownewmatrowsec = [true];
  }
  deletematNiv(i, activindex) {
    let tab = this.niveau[activindex].matieres;
    this.niveau[activindex].matieres = [];
    this.matListNiveau[activindex] = [];
    let k = 0;
    this.niveau[activindex].state = "update";
    for (let index = 0; index < tab.length; index++) {
      const element = tab[index];
      if (index != i) {
        this.niveau[activindex].matieres.push(element);
        this.matListNiveau[activindex].push(element.idmat);
      } else {
        if (this.updateniveau || this.updateniveausec || this.createniveausec) {
          k++;
          console.log(element.state);

          if (element.state != "create") {
            this.niveau[activindex].matieres.push({
              idmat: element.idmat,
              coef: element.coef,
              id: element.id,
              state: "delete"
            });
          }
        }
      }
    }

    if (
      k == tab.length &&
      (this.updateniveau || this.updateniveausec || this.createniveausec)
    ) {
      this.shownewmatrow[activindex] = true;
    }
  }
  deleteNivfromSec(i, j, matieres, activindex) {
    console.log(matieres);
    this.niveau[activindex].sections[j].matieres = [];
    if (!this.createniveausec) {
      this.niveau[activindex].sections[j].state = "update";
    }
    let k = 0;
    for (let index = 0; index < matieres.length; index++) {
      const element = matieres[index];
      if (i != index) {
        this.niveau[activindex].sections[j].matieres.push(element);
      } else {
        if (this.updateniveau || this.updateniveausec || this.createniveausec) {
          k++;
          console.log(element.state);

          if (element.state != "create") {
            this.niveau[activindex].sections[j].matieres.push({
              idmat: element.idmat,
              coef: element.coef,
              id: element.id,
              state: "delete"
            });
          }
        }
      }
    }

    if (
      k == matieres.length &&
      (!this.updateniveau && !this.updateniveausec && !this.createniveausec)
    ) {
      this.shownewmatrowsec[i] = true;
    }
  }

  getclasses(selectModel) {
    this.classeService.getClassesbyidEcole(selectModel).subscribe(res => {
      this.loader = false;
      console.log(res);
      this.data = res;
      this.data.forEach(element => {
        if (element.Decoupages) {
          element.libelleD = element.Decoupages.libelleD;
        }
        if (element.Niveaux) {
          element.niveau = element.Niveaux.libelleN;
        }
      });
    });
  }
  viewListCours(selectModel) {
    this.loader = true;
    this.data = [];
    this.ecoles.forEach(element => {
      if (element.id == selectModel) {
        this.monecole = element.nomE;
      }
    });
    this.authService.setIdSelectedEcole(selectModel);
    this.getdecoupagelist();
    this.getmatieres();
    this.getenseignants();
    // this.dis = true;
    if (this.class) {
      this.getClassesInfos();
    } else {
      this.getNiveauInfos();
    }
  }

  getClassesInfos() {
    this.getniveaux();
    this.getclasses(this.selectModel);
  }
  getNiveauInfos() {
    this.loadernivpage = true;
    this.getNiveaux();
  }
  openNiv() {
    this.class = false;
    if (this.selectModel) {
      this.getNiveauInfos();
    }
  }
  openClass() {
    this.class = true;
    if (this.selectModel) {
      this.getClassesInfos();
    }
  }
  getNiveaux() {
    this.ecoleNiv = [];
    let niv;
    this.classeService.getNiveaux().subscribe(res => {
      this.loadernivpage = false;
      if (res.niveaux) {
        res.niveaux.forEach(element => {
          niv = {
            name: element.libelleN,
            matieres: [],
            sections: [],
            id: element.id
          };
          if (element.Matieres) {
            if (element.Matieres.length > 0) {
              element.Matieres.forEach(mat => {
                niv.matieres.push({
                  idmat: mat.MatiereNivs.MatiereId,
                  id: mat.MatiereNivs.id,
                  coef: mat.MatiereNivs.coef
                });
              });
            }
          }
          if (element.Sections) {
            if (element.Sections.length > 0) {
              let sect = {
                name: "",
                matieres: [],
                id: null,
                delete: false
              };
              element.Sections.forEach(mat => {
                sect.name = mat.libelleS;
                sect.id = mat.id;

                mat.Matieres.forEach(matSec => {
                  sect.matieres.push({
                    coef: matSec.MatiereSections.coef,
                    idmat: matSec.MatiereSections.MatiereId,
                    id: matSec.MatiereSections.id
                  });
                });
                niv.sections.push(sect);
                sect = {
                  name: "",
                  matieres: [],
                  id: null,
                  delete: false
                };
              });
            }
          }
          this.ecoleNiv.push(niv);
        });
        console.log(this.ecoleNiv);
      }
    });
  }
  getenseignants() {
    this.classeService
      .getEnseignantsbyidecole(this.selectModel)
      .subscribe(res => {
        console.log("enseignants", res);
        this.enseignants = res;
        this.enseignantsp = res;
        this.coenseignants = res;
      });
  }
  Effacer_Recherche() {
    this.filterQuery = "";
  }
  createNiveau() {
    this.niveau[this.activeNiv].err = false;
    this.niveau.err = false;
    if (this.niveau[this.activeNiv].name == "") {
      this.niverr = true;
      this.niveau[this.activeNiv].err = true;
    } else {
      this.niverr = false;
    }
    this.niveau[this.activeNiv].sections.forEach(element => {
      if (element.name == "") {
        element.err = true;
        this.niveau[this.activeNiv].err = true;
        this.niveau.err = true;
      } else {
        element.err = false;
      }
    });
    console.log(this.niveau);
    console.log(this.activeNivindex);
    if (!this.niveau.err) {
      if (this.updateniveau || this.updateniveausec || this.createniveausec) {
        this.ecoleNiv[this.activeNivindex] = cloneDeep(this.niveau[0]);
        this.ecoleNiv[this.activeNivindex].state = "update";
        console.log(this.ecoleNiv[this.activeNivindex]);
        $("#modalAddNiveau").modal("hide");
      } else {
        this.classeService.creerNiveau(this.niveau).subscribe(res => {
          console.log(res);
          if (res.niveau) {
            this.addNiveauxaftercreate(res.niveau);
            this.successAddNiv = "Ajout des Niveaux effectuer avec succès";
            $("#modalAddNiveau").modal("hide");
            this.getNiveaux();
            setTimeout(() => {
              this.successAddNiv = " ";
            }, 3000);
          } else {
          }
        });
      }
    }
  }

  addNiveauxaftercreate(res) {
    let niv;

    res.forEach(element => {
      niv = {
        name: element.libelleN,
        matieres: [],
        sections: [],
        id: element.id
      };

      if (element.Matieres) {
        if (element.Matieres.length > 0) {
          element.Matieres.forEach(mat => {
            niv.matieres.push({
              idmat: mat.MatiereNivs.MatiereId,
              id: mat.MatiereNivs.id,
              coef: mat.MatiereNivs.coef
            });
          });
        }
      }
      if (element.Sections) {
        if (element.Sections.length > 0) {
          let sect = {
            name: "",
            matieres: [],
            id: null,
            delete: false
          };
          element.Sections.forEach(mat => {
            sect.name = mat.libelleS;
            sect.id = mat.id;

            mat.Matieres.forEach(matSec => {
              sect.matieres.push({
                coef: matSec.MatiereSections.coef,
                idmat: matSec.MatiereSections.MatiereId,
                id: matSec.MatiereSections.id
              });
            });
            niv.sections.push(sect);
            sect = {
              name: "",
              matieres: [],
              id: null,
              delete: false
            };
          });
        }
      }
      this.ecoleNiv.push(niv);
    });
  }
  updateNiveaux() {
    this.updatework = true;
    console.log("Mes Niveaux => ", this.ecoleNiv);
    let newobj = [];
    this.ecoleNiv.forEach(element => {
      if (element.state == "update") {
        newobj.push(element);
      }
    });
    // this.dis = true;
    this.updateniveau = false;
    this.updateniveausec = false;
    this.createniveausec = false;
    this.classeService.updateNiveaux(newobj).subscribe(res => {
      setTimeout(() => {
         this.updatework = false;        
      }, 200);
        this.successAddNiv = "Mise à jour de niveaux  effectuer avec succès";
        $("#modalAddNiveau").modal("hide");
        this.getNiveaux();
        let self = this;
        setTimeout(() => {
          self.successAddNiv = " ";
        }, 5000);
      
    });
  }
  getdecoupagelist() {
    this.classeService.getDecoupages(this.selectModel).subscribe(res => {
      console.log("decoupages", res);
      this.decoupages = res;
    });
  }

  getniveaux() {
    this.classeService.getNiveau(this.selectModel).subscribe(res => {
      console.log("getniveaux", res);
      this.niveaux = res;
    });
  }

  getmatieres() {
    this.matieresss = [];
    this.matiereService
      .getMatieresEcoleById(this.selectModel)
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
  AddClasse(classe) {
    // console.log(classe);
    //classe.avatar=this.pathAvatarSuper;
    this.classeService.AddClasse(classe);

    this.classes = this.classeService.getClasses();
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
    if (!this.newclass.niveau && !this.newclass.section) {
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
    this.errclass = {};
    console.log(this.newclass);

    if (
      (this.newclass.nomC || this.newclass.nomC == "") &&
      (this.newclass.abrege || this.newclass.abrege == "") &&
      (this.newclass.niveau || this.newclass.section) &&
      this.newclass.idDecoupage &&
      this.newclass.formatNotation
    ) {
      this.showClassErrors();
      this.saving = true;
      if (this.updateC) {
        this.updateClass();
      } else {
        this.newclass.icone = this.pathAvatarSuper;
        this.classeService.creerClasse(this.newclass).subscribe(res => {
          console.log(res);
          this.saving = false;
          this.successAdd =
            "Nouveau Classe «" + this.newclass.nomC + "» enregistré";
          $("#modalAdd").modal("hide");
          this.getclasses(this.selectModel);
          setTimeout(() => {
            this.successAdd = "";
          }, 2000);
        });
      }
    } else {
      this.showClassErrors();
    }
  }
  //update class
  updateClass() {
    this.newclass.icone = this.pathAvatarSuper;
    this.classeService
      .updateClass(this.newclass.id, this.newclass)
      .subscribe(res => {
        console.log(res);
        this.saving = true;
        this.updateC = false;
        this.successAdd =
          "Mise à jours de Classe «" +
          this.newclass.nomC +
          "» effectuer avec succès";
        $("#modalAdd").modal("hide");
        this.getclasses(this.selectModel);
        setTimeout(() => {
          this.successAdd = "";
        }, 2000);
      });
  }

  //imprimer pdf

  //upload image Avatar
  onAvatarSelected(event) {
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
  modalSupp(tmpclasse) {
    this.tmpclasse = tmpclasse;
  }

  deleteClasse(id) {
    console.log(id);
    this.classeService.deleteClasse(id).subscribe(res => {
      this.viewListCours(this.selectModel);
    });
  }

  updateClasse(classe) {
    console.log("update class");
    console.log(classe);

    this.classeService.updateClasse(classe);
    this.classes = this.classeService.getClasses();
  }

  ModalAfficheClasse(id, nomC, abrege, formatNotation) {
    //this.classes=classes;
    this.id = id;
    console.log(id);
    this.nomC = nomC;
    this.abrege = abrege;
    this.formatNotation = formatNotation;
  }

  //imprimer pdf
  generationPDF() {
    var columns = [
      { title: "Nom Classe ", dataKey: "nomC" },
      { title: "Abrégé", dataKey: "abrege" },
      { title: "Decoupage", dataKey: "libelleD" },
      { title: "Niveau", dataKey: "niveau" }
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
        doc.text("Liste des Classes", 128, 15);
      }
    });
    doc.autoPrint();
    "Classe_" + this.authService.getNomGroupe() + "_" + this.monecole;
    doc.save(
      "Classe_" + this.authService.getNomGroupe() + "_" + this.monecole + ".pdf"
    );
    //doc.output('dataurlnewwindow');
    doc.output(
      "dataurlnewwindow",
      "Classe_" + this.authService.getNomGroupe() + "_" + this.monecole + ".pdf"
    );
    window.open(doc.output("bloburl"), "_blank");
  }

  //exportation excel
  exportationExcel() {
    let tab = [];
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      tab.push({
        "Nom Classe": element.nomC,
        abrege: element.abrege,
        Niveau: element.Niveaux ? element.Niveaux.libelleN : " ",
        Decoupage: element.Decoupages ? element.Decoupages.libelleD : " "
      });
      if (index == this.data.length - 1) {
        this.excel.downloadExcel(
          tab,
          "Classe" + this.authService.getNomGroupe() + "_" + this.monecole
        );
      }
    }
  }

  ngOnInit() {
    console.log(location.pathname);
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
            this.getdecoupagelist();
            this.getmatieres();
            this.getenseignants();
            // this.dis = true;
            if (this.class) {
              this.getClassesInfos();
            } else {
              this.getNiveauInfos();
            }
          }
          this.ecoleService.getEcoles(res.id).subscribe(res2 => {
            console.log(res2);
            this.ecoles = res2;
            this.loader = false;
          });
        } else {
          this.data = [];
          this.ecoleNiv = [];
          console.log("resssssssssssssssss");
          this.loader = false;
          this.ecoles = [];
          // this.ecoleService
          //   .getEcoles(this.authService.getNomGroupe())
          //   .subscribe(res2 => {
          //     this.loader = false;
          //     console.log(res2);
          //     this.ecoles = res2;
          //   });
        }
      }
    });
  }
}
