import { Component, OnInit, ViewChild } from "@angular/core";
import { ClasseService } from "../../../../services/classe.service";
import { AuthService } from "../../../../services/auth.service";
import { SidebarlevelsComponent } from "./sidebarlevels/sidebarlevels.component";
import { DndModule } from "ng2-dnd";
import { ToastrService } from 'ngx-toastr';
import * as cloneDeep from "lodash/cloneDeep";

@Component({
  selector: "app-scolar-level",
  templateUrl: "./scolar-level.component.html",
  styleUrls: ["./scolar-level.component.css"]
})
export class ScolarLevelComponent implements OnInit {
  @ViewChild(SidebarlevelsComponent) sidebar: SidebarlevelsComponent;
  listOne: Array<string> = [
    "Coffee",
    "Orange Juice",
    "Red Wine",
    "Unhealty drink!",
    "Water"
  ];

  dis: any = false;
  matListNiveau: any = [[]];
  ngniv: any = 1;
  niverr: any = false;
  niveau: any = [];
  activeNiv: any = 0;
  activeNivindex: any = 0;
  loadernivpage: any = false;
  updateniveau: any = false;
  updateniveausec: any = false;
  createniveausec: any = false;
  ecoleNiv: any = [];
  sectionFordelete: any = { section: {} };
  monNivSecNew: any = [];
  indexSecActive: any = 1;
  open: any = [true];
  newsectionmatrow: any = [];
  shownewmatrow: any = false;
  shownewmatrowsec: any = [];
  newmatrow: any = {};
  matieres: any = [];
  selectedecole: any = 7;
  _opened: any = false;
  sortable: any = false;
  filterQuery:any=''
  secDelLoader: any = false;
  showlevel:any=[]
  constructor(
    public classeService: ClasseService,
    public authService: AuthService,
    private toastr: ToastrService    
  ) {
  }
  Effacer_Recherche() {
    this.filterQuery = "";
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
   _toggleSidebar() {
    this._opened = !this._opened;
  }
  ngOnInit() {
    this.loadernivpage = true;
    this.getNiveaux();
  }
  showSuccess(massage) {
    this.toastr.success( massage,'Succès !',{
      timeOut: 3000,
    });
  }
  updateted() {
    this.showSuccess('Enregistrement a été effectué avec succès.')    
    this._opened = false;
    this.loadernivpage = true;
    this.getNiveaux();
  }
  initNiv(nb) {
    this.sidebar.initNiv(nb);
  }
  getNiveaux() {
    this.ecoleNiv = [];
    this.showlevel=[]
    let niv;
    this.classeService.getNiveaux().subscribe(res => {
      this.loadernivpage = false;
      if (res.niveaux) {
        res.niveaux.forEach(element => {
          this.showlevel.push(false)
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
  deleteSectionFromNivModal(section, activeNivpage, i) {
    this.secDelLoader = true;
    if (this.sectionFordelete.section.state != "create") {
      this.classeService.candeleteSection(section.id).subscribe(res => {
        console.log(res);
        this.showSuccess('Enregistrement a été effectué avec succès.')    
        
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
      this.ecoleNiv[this.sectionFordelete.niveau].sections[
        this.sectionFordelete.index
      ] = this.sectionFordelete.section;
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
    this.sidebar.openupdateNiv(activeNivpage);
  }
  openupdateNivsec(activeNivpage, i) {
    this.sidebar.openupdateNivsec(activeNivpage, i);
  }
  openupdateNivNewsec(activeNivpage) {
    this.sidebar.openupdateNivNewsec(activeNivpage);
  }

  showselected(index) {
    this.niveau[index].matieres = [];
    console.log(this.matListNiveau[index]);
    this.matListNiveau[index].forEach(element => {
      this.niveau[index].matieres.push({ idmat: element, coef: "" });
    });
  }

  updateNiveaux() {
    console.log("Mes Niveaux => ", this.ecoleNiv);
    let newobj = [];
    this.ecoleNiv.forEach(element => {
      if (element.state == "update") {
        newobj.push(element);
      }
    });
    this.dis = true;
    this.updateniveau = false;
    this.updateniveausec = false;
    this.createniveausec = false;
    this.classeService.updateNiveaux(newobj).subscribe(res => {
    this.showSuccess('Enregistrement a été effectué avec succès.')    
    // this.getNiveaux();
    });
    // setTimeout(() => {
    //   this.successAddNiv =
    //     "Mise à jour de niveau «" +
    //     this.niveau.name +
    //     "» effectuer avec succès";
    //   this.getNiveaux();
    // }, 2000);
    // setTimeout(() => {
    //   this.successAddNiv = " ";
    // }, 2000);
  }
}
