import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../../../../services/auth.service";
import { GroupeAndRegroupingService } from "../../../../services/groupe-and-regrouping.service";
import { HttpClient } from "@angular/common/http";
import * as cloneDeep from "lodash/cloneDeep";
import { deepEqual } from "assert";

@Component({
  selector: "app-sidebargroupement",
  templateUrl: "./sidebargroupement.component.html",
  styleUrls: ["./sidebargroupement.component.scss"]
})
export class SidebargroupementComponent implements OnInit {
  @Input() groupement: any = { objGroupeEleve: [] };
  @Input() mode: any = "create";
  @Output() update = new EventEmitter<boolean>();
  @Output() erreur = new EventEmitter<boolean>();

  classes: any = [];
  classeCreate: any = [
    { label: "classe1 niv1 sec1", id: "1" },
    { label: "classe1 niv2 sec1", id: "2" },
    { label: "classe2 niv2 ", id: "3" }
  ];
  saving: any = false;
  newGroupement: any = {
    studentsSelected: [],
    students: [],
    studentsSelectedlabels: [],
    Etat: "created"
  };
  err: any = {};
  loadinC: any = false;
  classesList: any = [];
  showaddclass: any = false;
  checkallbtn: any = false;
  //upload groupement Image
  tmp: any = 1;
  selectedFile: File = null;
  pathAvatarSuper: any = "";

  constructor(
    public groupingService: GroupeAndRegroupingService,
    public auth: AuthService,
    public http: HttpClient
  ) {
    this.getClasses();
  }
  initGroupe(groupe) {
    this.classesList = [];
    this.loadinC = true;
    if (groupe.Classes.length > 0) {
      this.newGroupement = {
        classeId: groupe.Classes[0].idClasse,
        studentsSelected: [],
        students: [],
        studentsSelectedlabels: []
      };
    }
    this.showaddclass = false;
    this.getStudents();
    this.groupement = cloneDeep(groupe);
    this.groupement.objGroupeEleve = [];
    console.log(groupe);
    let self = this;
    groupe.Classes.forEach((element, index) => {
      this.getClassbyGroupementId(element.idClasse, index, groupe);
    });
    console.log(this.classesList);
  }
  getGroupementbyid(id) {
    this.groupingService.getGroupementbyid(id).subscribe(res => {
      console.log("groupement ", id, " ==>", res);
    });
  }
  getClassbyGroupementId(id, index, groupe) {
    this.groupingService.getClassbyGroupementId(id).subscribe(res => {
      console.log("classe de groupe  ", id, " ==>", res);
      let obj = {
        studentsSelectedlabels: [],
        studentsSelected: [],
        classeId: id,
        Etat: "created"
      };

      res.forEach((element, i) => {
        obj.studentsSelectedlabels.push(
          (element.nom || "") + " " + (element.prenon || "")
        );
        obj.studentsSelected.push(element.idE);
        if (index + 1 == groupe.Classes.length && i + 1 == res.length) {
          this.loadinC = false;
        }
        //this.groupement.objGroupeEleve.push(element.idE)
      });

      res.studentsSelectedlabels = this.classesList.push(obj);
    });
  }
  ngOnInit() {}

  checkAll() {
    this.newGroupement.studentsSelected = [];
    this.newGroupement.studentsSelectedlabels = [];
    this.newGroupement.students.forEach(element => {
      element.checked = this.checkallbtn;
      if (this.checkallbtn) {
        this.newGroupement.studentsSelected.push(element.idE);
        this.newGroupement.studentsSelectedlabels.push(
          element.nom + " " + element.prenon
        );
      }
    });
    console.log(this.newGroupement.studentsSelected);
  }
  show(e, id, eleve) {
    console.log("eleve:=>", eleve);
    console.log("event:=>", e);
    console.log("id:=>", id);
    eleve.ckecked = e.target.checked;
    let index = this.newGroupement.studentsSelected.indexOf(id);
    if (index > -1) {
      this.newGroupement.studentsSelected.splice(index, 1);
      this.newGroupement.studentsSelectedlabels.splice(index, 1);
    }
    if (e.target.checked) {
      this.newGroupement.studentsSelected.push(id);
      this.newGroupement.studentsSelectedlabels.push(
        eleve.nom + " " + eleve.prenon
      );
      if (
        this.newGroupement.studentsSelected.length ==
        this.newGroupement.students.length
      ) {
        this.checkallbtn = true;
      }
    } else {
      if (this.newGroupement.studentsSelected.length == 0) {
        this.checkallbtn = false;
      }
    }
    console.log(this.newGroupement.studentsSelected);
  }
  //get classes
  getClasses() {
    this.groupingService.getclasses().subscribe(res => {
      console.log("classes", res);
      this.classes = cloneDeep(res);
      this.classeCreate = cloneDeep(res);
    });
  }
  getClassByIdC(id) {
    this.groupingService.getClassByIdC(id).subscribe(res => {
      this.classeCreate = cloneDeep(res);
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
      this.groupement.avatar = res;
      this.pathAvatarSuper = res;
    });
  }

  //get studests by id class
  getStudents() {
    this.groupingService
      .getStudents(this.newGroupement.classeId)
      .subscribe(res => {
        console.log(res);
        this.newGroupement.students = res;
      });
  }

  //add row to classe groupment list
  addRow() {
    this.newGroupement.studentsSelected.forEach(element => {
      this.groupement.objGroupeEleve.push({
        ElefeId: element,
        Etat: "created"
      });
    });
    this.newGroupement.Etat = "created";
    this.classesList.push(this.newGroupement);
    this.getClassByIdC(this.newGroupement.classeId);
    this.newGroupement.studentsSelected = [];
    this.showaddclass = false;
  }
  //save groupment form
  save() {
    console.log(this.groupement);
    this.err = {};
    console.log(this.classesList);

    if (
      !this.groupement.nomGpe ||
      this.groupement.nomGpe == "" ||
      !this.groupement.abregeGpe ||
      this.groupement.abregeGpe == "" ||
      !this.classesList ||
      this.classesList.length == 0
    ) {
      this.err = {
        nomGpe: !this.groupement.nomGpe || this.groupement.nomGpe == "",
        abregeGpe:
          !this.groupement.abregeGpe || this.groupement.abregeGpe == "",
        classesList: !this.classesList || this.classesList.length == 0
      };
    } else {
      this.saving = true;
      if (this.mode == "create") {
        this.groupingService
          .createGroupement(this.groupement)
          .subscribe(res => {
            this.saving = false;
            if (res.err) {
              this.erreur.emit(true);
            } else {
              this.update.emit(true);
            }
          });
      } else {
        this.groupingService
          .updateGroupement(this.groupement)
          .subscribe(res => {
            this.saving = false;
            if (res.err) {
              this.erreur.emit(true);
            } else {
              this.update.emit(true);
            }
          });
      }
    }
  }
  deleteRow(i) {
    if (this.classesList[i].Etat != "created") {
      this.classesList[i].Etat = "deleted";
    } else {
      this.classesList.splice(i, 1);
    }
  }
}
