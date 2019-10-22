import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { GroupeAndRegroupingService } from "../../../services/groupe-and-regrouping.service";
import { ToastrService } from "ngx-toastr";
import { SidebargroupementComponent } from "./sidebargroupement/sidebargroupement.component";
import { SidebarRegroupingComponent } from "./sidebar-regrouping/sidebar-regrouping.component";
import { AuthService } from "../../../services/auth.service";
import { ExelDownloadService } from "../../../services/exel-download.service";

declare var jsPDF: any;

@Component({
  selector: "app-groups-and-grouping",
  templateUrl: "./groups-and-grouping.component.html",
  styleUrls: ["./groups-and-grouping.component.css"]
})
export class GroupsAndGroupingComponent implements OnInit {
  @ViewChild(SidebargroupementComponent) groupement: SidebargroupementComponent;
  @ViewChild(SidebarRegroupingComponent)
  regroupement: SidebarRegroupingComponent;
  public _opened: boolean = false;
  modalRef: BsModalRef;
  mode: any = "create";
  type: any = "G";
  loading: any = true;
  deleteProcess:any=false
  data: any = [];
  filterQuery:any=''
  objetDel: any = {};
  constructor(
    public excel: ExelDownloadService,    
    public authService:AuthService ,
    public toastr: ToastrService,
    public modalService: BsModalService,
    public groupingService: GroupeAndRegroupingService
  ) {}
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  _toggleSidebar() {
    if (!this._opened) {
      this._opened = !this._opened;
    }
  }
  openUpdate(classe) {
    this._opened = true;
    this.mode = "update";    
    if( classe.type == "groupe"){
      this.type="G"
      setTimeout(() => {
        this.groupement.initGroupe(classe);
      }, 200);   
    }else{
      this.type="R"   
      setTimeout(() => {
      this.regroupement.getReroupmentDetails(classe.id)        
      }, 200);   
    }
  }
  updated() {
    this._opened = false;
    let message =
      (this.mode == "create" ? "Création" : "Mise à jours") +
      " de " +
      (this.type == "G" ? "groupe" : "regroupement") +
      " a été effectué avec succès.";
    this.showSuccess(message);
    this.getData();
  }
  updateErr() {
    this._opened = false;
    this.showErr("Une erreur s’est produite lors de l'enregistrement");
  }
  showErr(message) {
    this.toastr.error(message, "Erreur !", {
      timeOut: 5000
    });
  }
  showSuccess(massage) {
    this.toastr.success(massage, "Succès !", {
      timeOut: 5000
    });
  }
  getData() {
    this.loading = true;
    this.data = [];
    let end1=false
    let end2=false
    this.groupingService.getGroupements().subscribe(res => {
      res.forEach(element => {
        this.loading = false;
        element.nom=element.nomGpe
        element.aberge=element.abregeGpe
        this.data.push(element);
      });
      if(res.length!=0){
        this.loading = false;
      }
    });
    this.groupingService.getRegroupements().subscribe(res => {
      res.forEach(element => {
        this.loading = false;   
        element.aberge=element.abregeReg             
        this.data.push(element);
      });
      if(res.length!=0){
        this.loading = false;
      }
    });
    console.log(this.data);
  }
  delete(obj,index) {
    console.log('object that will be deleted',obj);
    
    if (obj.type == "groupe") {
      this.deleteGroupement(obj.id);
    }else{
      this.deleteRegroupement(obj.id);
      
    }
  }
  deleteGroupement(id) {
    this.deleteProcess=true
    this.groupingService.deleteGroupement(id).subscribe(res => {
    this.deleteProcess=false      
      console.log("deleted");
      if (res.err) {
        this.showErr("Une erreur s’est produite lors de suppression");
      } else {
        this.showSuccess("Groupe supprimer avec succes");
        this.data.splice(this.objetDel.index,1)
      }
    });
  }
  deleteRegroupement(id) {
    this.deleteProcess=true
    this.groupingService.deleteRegroupement(id).subscribe(res => {
    this.deleteProcess=false      
      console.log("deleted");
      if (res.err) {
        this.showErr("Une erreur s’est produite lors de suppression");
      } else {
        this.showSuccess("Groupe supprimer avec succes");
        this.data.splice(this.objetDel.index,1)
      }
    });
  }
  ngOnInit() {
    this.getData();
  }
  //imprimer pdf
  generationPDF() {
    var columns = [
      { title: "Nom", dataKey: "nom" },
      { title: "Type", dataKey: "type" },      
      { title: "Abrégé", dataKey: "aberge" },
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
        doc.text("Liste des groupes&regroupements", 128, 15);
      }
    });
    doc.autoPrint();
    "groupes&regroupements" + this.authService.getNomGroupe() + "_" + this.authService.getNomEcole()
    doc.save(
      "groupes&regroupements" + this.authService.getNomGroupe() + "_" + this.authService.getNomEcole() + ".pdf"
    );

  }

  //exportation excel
  exportationExcel() {
    let tab = [];
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      tab.push({
        "Nom Classe": element.nom||" ",
        Type:element.type||" ",
        abrege: element.abrege||" ",
       
      });
      if (index == this.data.length - 1) {
        this.excel.downloadExcel(
          tab,
          "groupes&regroupements" + this.authService.getNomGroupe() + "_" + this.authService.getNomEcole()
        );
      }
    }
  }
}
