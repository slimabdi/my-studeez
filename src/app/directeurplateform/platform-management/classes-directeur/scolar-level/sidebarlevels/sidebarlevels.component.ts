import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { IOption } from "ng-select";
import * as cloneDeep from "lodash/cloneDeep";
import { MatiereService } from "../../../../../services/matiere.service";
import { ClasseService } from "../../../../../services/classe.service";
import { AuthService } from "../../../../../services/auth.service";

@Component({
  selector: "app-sidebarlevels",
  templateUrl: "./sidebarlevels.component.html",
  styleUrls: ["./sidebarlevels.component.css",    "../../../../../../assets/scss/ng-select/ng-select.scss",
]
})
export class SidebarlevelsComponent implements OnInit {
  @Output() update = new EventEmitter<boolean>();

  dis: any = true;
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
  @Input() ecoleNiv: any = [];
  sectionFordelete: any = { section: {} };
  monNivSecNew: any = [];
  indexSecActive: any = 1;
  open: any = [true];
  newsectionmatrow: any = [];
  shownewmatrow: any = false;
  shownewmatrowsec: any = [];
  newmatrow: any = {};
  public matieresss: Array<IOption> = [];
  matieres: any = [];

  constructor(
    public classeService: ClasseService,
    private matiereService: MatiereService,
    private authservice:AuthService
  ) {}
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
  ngOnInit() {
    this.getmatieres()
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
    if (!this.monNivSecNew[0].err) {
      this.ecoleNiv[this.activeNivindex].sections.push(
        this.monNivSecNew[0].sections[0]
      );
      this.ecoleNiv[this.activeNivindex].state = "update";
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
  getmatieres() {
    this.matieresss = [];
    this.matiereService
      .getMatieresEcoleById(this.authservice.getIdSelectedEcole())
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

  initNiv(nb) {
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
  addSection(index) {
    this.niveau[index].sections.push({
      name: "",
      matieres: []
    });
    this.open.push(true);
    this.newsectionmatrow.push({});
    this.shownewmatrowsec.push(true);
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
      } else {
        this.classeService.creerNiveau(this.niveau).subscribe(res => {
          console.log(res);
          this.update.emit(true);
          this.niveau = [];
          // this.getNiveaux()
        });
        //  let self=this
        //   setTimeout(() => {
        //     self.successAddNiv = "Nouveau Niveau «" + self.niveau.name + "» enregistré";
        //     self.getNiveaux();
        //     $('#modalAddNiveau').modal('hide');
        //   }, 2000);
        //   setTimeout(() => {
        //     self.successAddNiv = " ";
        //   }, 2000);
      }
    }
  }
}
