import { Component, OnInit, Input ,Output,EventEmitter} from "@angular/core";
import { ScheduleService } from "../../../../../services/schedule.service";

@Component({
  selector: "app-sidebarshedulestudent",
  templateUrl: "./sidebarshedulestudent.component.html",
  styleUrls: ["./sidebarshedulestudent.component.css"]
})
export class SidebarshedulestudentComponent implements OnInit {
  @Input() course: any = {};
  @Input() voir: any = false;
  @Output() update = new EventEmitter<boolean>();
  dis: any = true;
  add: any = true;
  msg: any = false;
  newcolor: any = "#fff";
  colors: any = [
    "#9fd8d4",
    "#f4adab",
    "#eea507",
    "#ed5937",
    "#666666",
    "#6189a3"
  ];
  annulation:any=false  
  classes: any = [];
  matiere: any = [];
  ens: any = [];
  co_ens: any = [];
  constructor(public service: ScheduleService) {}

  ngOnInit() {}
  changecol() {
    console.log("my new col ", this.newcolor);
    this.course.codeCouleur = this.newcolor;
    if (this.colors.indexOf(this.newcolor) <= -1) {
      this.colors.push(this.newcolor);
    }
  }

  initFiche() {
    this.voir = false;
    console.log(this.course.codeCouleur);
    this.course.du=new Date(this.course.du)
    if (this.colors.indexOf(this.course.codeCouleur) <= -1) {
      this.colors.push(this.course.codeCouleur);
    }
    this.getclasses();
    this.getsubjects();
    this.getEns(this.course.Matiere.id);
    this.getCo_Ens(this.course.Matiere.id);
  }
  getclasses() {
    this.service.getclasses().subscribe(res => {
      console.log("Classes", res);
      if (!res.error) {
        this.classes = res;
      }
    });
  }
  getsubjects() {
    this.service.getMatieres().subscribe(res => {
      console.log("matiere=>", res);
      if (!res.error) {
        this.matiere = res;
      }
    });
  }
  getEns(id) {
    this.service.getEnsei(id).subscribe(res => {
      console.log("ens=>", res);
      if (!res.error) {
        this.ens = res;
      }
    });
  }
  getCo_Ens(id) {
    this.service.getco_ensei(id).subscribe(res => {
      console.log("coens=>", res);
      if (!res.error) {
        this.co_ens = res[0];
      }
    });
  }
  cancelCourse(){
    this.annulation=true    
    this.service.CancelSeance(this.course.id).subscribe(res=>{
      console.log(res);
      this.annulation=false
      this.update.emit(true)
    })
  }
}
