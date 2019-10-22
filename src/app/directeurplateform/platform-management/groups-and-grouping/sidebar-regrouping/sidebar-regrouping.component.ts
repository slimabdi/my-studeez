import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../../../../services/auth.service";
import { GroupeAndRegroupingService } from "../../../../services/groupe-and-regrouping.service";
import { HttpClient } from "@angular/common/http";
import * as cloneDeep from "lodash/cloneDeep";
import { deepEqual } from "assert";

@Component({
  selector: "app-sidebar-regrouping",
  templateUrl: "./sidebar-regrouping.component.html",
  styleUrls: ["./sidebar-regrouping.component.scss"]
})
export class SidebarRegroupingComponent implements OnInit {
  regroupement: any = {
    nomReg: "",
    abregeReg: "",
    idMatiere: null,
    coefMat: null,
    idEnseig: null,
    coEnseig: null,
    avatar: null,
    objRegroupeMatiere: []
  };

  @Input() mode: any = "create";
  @Output() update = new EventEmitter<boolean>();
  @Output() erreur = new EventEmitter<boolean>();
  classesListe: any = [];
  tabMatInput: any = ["", "", "", ""];
  matieres: any = [];
  ens: any = [];
  co_ens: any = [];
  classes: any = [];
  saving: any = false;
  nivSelect: any = false;
  regroupementObj: any = {
    idMatiere: null,
    coefMat: null,
    idEnseig: null,
    coEnseig: null
  };
  classeId: any = null;
  showadd: any = false;
  //upload regroupement Image
  tmp: any = 1;
  selectedFile: File = null;
  pathAvatarSuper: any = "";
  constructor(
    public groupingService: GroupeAndRegroupingService,
    public auth: AuthService,
    public http: HttpClient
  ) {}

  ngOnInit() {
    this.getMath();
    this.getClasses();
  }
initpage(){
  this.regroupement={
    nomReg: "",
    abregeReg: "",
    idMatiere: null,
    coefMat: null,
    idEnseig: null,
    coEnseig: null,
    avatar: null,
    objRegroupeMatiere: []
  };
  this.regroupementObj = {
    idMatiere: null,
    coefMat: null,
    idEnseig: null,
    coEnseig: null
  };
  this.classesListe = [];
  this.tabMatInput = ["", "", "", ""];
}
  getReroupmentDetails(id) {
    this.groupingService.getReroupmentDetails(id).subscribe(res => {
      if (res.length > 0) {
        let result = res[0];

        this.regroupement = {
          nomReg: result.nom,
          abregeReg: result.abregeReg,
          idMatiere: result.idMatiere,
          coefMat: result.coefMat,
          idEnseig: result.idEnseig,
          coEnseig: result.idEnseig,
          avatar: result.idEnseig,
          objRegroupeMatiere: []
        };
        this.regroupementObj={
          idMatiere: result.idMatiere,
          coefMat: result.coefMat,
          idEnseig: result.idEnseig,
          coEnseig: result.idEnseig
        }
        this.matChanged(result.idMatiere);
        this.matchangelist(result.idMatiere);
        this.coefChanged();
        this.ensChanged(result.idEnseig);
        this.Co_ensChanged(result.coEnseig);
        if (result.classes) {
          result.classes.forEach(element => {
            element.idC = element.idClasse + "C";
            this.classesListe.push({id:element.idClasse + "C"})
          });
        }
        if (result.groupes) {
          result.groupes.forEach(element => {
            element.idC = element.idGroupe + "G";
            this.classesListe.push({id:element.idGroupe + "G"})
          });
        }
      }
      console.log(this.classesListe);
      
      console.log(this.regroupement);
      console.log(this.classes);
    });
  }

  //upload image Avatar
  onAvatarSelected(event) {
    console.log(event.target.files[0]);
    this.tmp = "tmp";
    this.selectedFile = <File>event.target.files[0];
    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    this.http.post(this.auth.getSubDomain() + "/upload", fd).subscribe(res => {
      console.log("res", res);
      this.regroupement.avatar = res;
      this.pathAvatarSuper = res;
    });
  }
  save() {
    this.regroupement.objRegroupeMatiere = [];
    if (this.classesListe.length > 0) {
      console.log(this.regroupement);
     
      if (this.mode == "create") {
        this.create(this.regroupement);
      } else {
        this.updateRe(this.regroupement);
      }
    }
  }
  updateRe(obj) {
    console.log(this.classesListe);
    
    this.classesListe.forEach(element => {
      let x=element.id
      let type = x[x.length - 1];
      let id = x.substring(0, x.length - 1);
      if(element.Etat){
        this.regroupement.objRegroupeMatiere.push({
          id: id,
          type: type == "C" ? "Classe" : "Groupe",
          Etat:element.Etat
        });
      }
    
    });
    this.saving = true;
    this.groupingService.updateRegroupementt(obj).subscribe(res => {
      this.saving = false;
      console.log(res);
      if (res.err) {
        this.erreur.emit(true);
      } else {
        this.update.emit(true);
      }
    });
  }
  create(obj) {
    this.classesListe.forEach(element => {
      let x=element.id
      let type = x[x.length - 1];
      let id = x.substring(0, x.length - 1);
      this.regroupement.objRegroupeMatiere.push({
        id: id,
        type: type == "C" ? "Classe" : "Groupe",
      });
    });
    this.saving = true;
    this.groupingService.createRegroupement(obj).subscribe(res => {
      this.saving = false;
      console.log(res);
      if (res.err) {
        this.erreur.emit(true);
      } else {
        this.update.emit(true);
      }
    });
  }

  addClass_Groupe() {
  console.log(this.classeId);
  
    if (this.classesListe.indexOf({id:this.classeId}) <= -1) {
      this.classesListe.push({id:this.classeId,Etat:'created'});
      this.classeId = null;
      this.showadd = false;
    } else {
      this.classeId = null;
      this.showadd = false;
    }
    console.log('this.classesListe',this.classesListe);
    
  }
  deleteClass(item){
    if(item.Etat!='created'){
      item.Etat='deleted'
    }else{
      let obj=cloneDeep(this.classesListe)
      this.classesListe=[]
      obj.forEach(element => {
         if(element.id!=item.idC){
              this.classesListe.push(element)
         }
      });
    }
  }
  show() {
    this.showadd = true;
    this.classeId = null;
  }
  getMath() {
    this.groupingService.getMatieres().subscribe(res => {
      console.log(res);
      this.matieres = res;
    });
  }

  getEnseig(id) {
    this.groupingService.getEnsei(id).subscribe(res => {
      console.log(res);
      if (!res.error) {
        this.ens = res;
      }
    });
  }
  getCo_Enseig(id) {
    this.groupingService.getco_ensei(id).subscribe(res => {
      console.log(res);
      if (!res.error) {
        if (res.length != 0) {
          this.co_ens = res[0];
        }
      }
    });
  }
  //get classes
  getClasses() {
    this.groupingService.getclasses().subscribe(res => {
      console.log("classes", res);
      res.forEach(element => {
        element.idC = element.id + "C";
        this.classes.push(element);
      });
    });
    this.groupingService.getGroupements().subscribe(res => {
      console.log("groupes", res);
      res.forEach(element => {
        element.idC = element.id + "G";
        this.classes.push(element);
      });
    });
  }
  matChanged(id) {
    if (id) {
      this.getEnseig(id);
      this.getCo_Enseig(id);
    } else {
      this.co_ens = [];
      this.ens = [];
    }
  }
  matchangelist(id) {
    if (id) {
      this.matieres.forEach(element => {
        if (element.id == id) {
          this.tabMatInput[0] = element.nomMatiere;
        }
      });
    } else {
      this.tabMatInput[0] = "";
    }
  }
  ensChanged(id) {
    if (id) {
      this.ens.forEach(element => {
        if (element.id == id) {
          this.tabMatInput[1] = element.nom + " " + element.prenom;
        }
      });
    } else {
      this.tabMatInput[1] = "";
    }
    console.log(this.tabMatInput);
  }
  Co_ensChanged(id) {
    if (id) {
      this.co_ens.forEach(element => {
        if (element.id == id) {
          this.tabMatInput[2] = element.nom + " " + element.prenom;
        }
      });
    } else {
      this.tabMatInput[2] = "";
    }
    console.log(this.tabMatInput);
  }
  coefChanged() {
    if (this.regroupement.coefMat) {
      this.tabMatInput[3] = this.regroupement.coefMat;
    } else {
      this.regroupement.coefMat = "";
    }
    console.log(this.tabMatInput);
  }
  saveMatList() {
    console.log(this.regroupementObj);
    this.regroupement.idMatiere = cloneDeep(this.regroupementObj.idMatiere);
    this.matchangelist(this.regroupementObj.idMatiere);
    this.regroupement.coefMat = cloneDeep(this.regroupementObj.coefMat);
    this.coefChanged();
    this.regroupement.idEnseig = cloneDeep(this.regroupementObj.idEnseig);
    this.ensChanged(this.regroupementObj.idEnseig);
    this.regroupement.coEnseig = cloneDeep(this.regroupementObj.coEnseig);
    this.Co_ensChanged(this.regroupementObj.coEnseig);
    this.nivSelect = false;
  }
  listMatCancled() {
    this.regroupementObj = {
      idMatiere: cloneDeep(this.regroupement.idMatiere),
      coefMat: cloneDeep(this.regroupement.coefMat),
      idEnseig: cloneDeep(this.regroupement.idEnseig),
      coEnseig: cloneDeep(this.regroupement.coEnseig)
    };
    this.nivSelect = false;
  }

  deleteMat() {
    this.tabMatInput[0] = "";
    this.regroupement.idMatiere = null;
    this.regroupement.coefMat = null;
    this.regroupement.idEnseig = null;
    this.regroupement.coEnseig = null;
    this.regroupementObj = {
      idMatiere: null,
      coefMat: null,
      idEnseig: null,
      coEnseig: null
    };
  }
}
