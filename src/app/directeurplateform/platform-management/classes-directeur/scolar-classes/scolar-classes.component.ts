import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { ClasseService } from "../../../../services/classe.service";
import { AuthService } from "../../../../services/auth.service";
import { ExelDownloadService } from "../../../../services/exel-download.service";
import { SidebarscolarclassComponent } from "./sidebarscolarclass/sidebarscolarclass.component";
import { ToastrService } from 'ngx-toastr';

declare var jsPDF: any;

@Component({
  selector: "app-scolar-classes",
  templateUrl: "./scolar-classes.component.html",
  styleUrls: ["./scolar-classes.component.css"]
})
export class ScolarClassesComponent implements OnInit {
  @ViewChild(SidebarscolarclassComponent) sidebar: SidebarscolarclassComponent;
  monecole: any = "papillon";
  data: any = [];
  //******slideToggle*****//
  name = "slideToggle";
  id = "1";
  checked = false;
  disabled = false;
  gaugeType = "full";
  gaugeSize = 50;
  gaugeValue = 73;
  gaugeLabel = "";
  gaugeAppendText = "%";
  dataFilter: any = "";
  tmp:any=''
  filterQuery:any=""
  newclass: any = { matiere_ens: [], icone: "" };
  //******slideToggle*****//
  constructor(
     public excel: ExelDownloadService,
    public classeservice: ClasseService,
    public authService: AuthService,
     public toastr: ToastrService
    
  ) {
    this.getClasses();
    
  }
  Effacer_Recherche() {
    this.filterQuery = "";
  }
  showSuccess(massage) {
    this.toastr.success( massage,'Succès !',{
      timeOut: 3000,
    });
  }
  updated(){
    console.log();
    
    this.showSuccess('Enregistrement a été effectué avec succès.')
    this.getClasses();
    this._opened=false
  }
   public _opened: boolean = false;
   public _toggleSidebar() {
    this._opened = !this._opened;
  }
  initClass() {
    this.sidebar.opencreateclasse();
    this._toggleSidebar();
  }

  getClasses() {
    this.classeservice.getClassesbyidEcole(this.authService.getIdSelectedEcole()).subscribe(res => {
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
  deleteClasse(id) {
    console.log(id);
    this.classeservice.deleteClasse(id).subscribe(res => {
      this.getClasses();
    });
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
    "Classe_" + this.authService.getNomGroupe() + "_" + this.authService.getNomEcole()
    doc.save(
      "Classe_" + this.authService.getNomGroupe() + "_" + this.authService.getNomEcole() + ".pdf"
    );
    // //doc.output('dataurlnewwindow');
    // doc.output(
    //   "dataurlnewwindow",
    //   "Classe_" + this.authService.getNomGroupe() + "_" + this.authService.getNomEcole() + ".pdf"
    // );
    // window.open(doc.output("bloburl"), "_blank");
  }
  //imprimer pdf
  generateFicheClass(obj) {
    console.log(obj);

    var columns = [
      { title: "Nom Classe ", dataKey: "nomC" },
      { title: "Abrégé", dataKey: "abrege" },
      { title: "Decoupage", dataKey: "libelleD" },
      { title: "Niveau", dataKey: "niveau" }
    ];
    let data = [obj];
    var doc = new jsPDF("l", "mm", [297, 210]);
    doc.autoTable(columns, data, {
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
    "Classe_" +
      this.authService.getNomGroupe() +
      "_" +
      this.monecole +
      "_" +
      obj.nomC;
    doc.save(
      "Classe_" +
        this.authService.getNomGroupe() +
        "_" +
        this.monecole +
        "_" +
        obj.nomC +
        ".pdf"
    );
    //doc.output('dataurlnewwindow');
    doc.output(
      "dataurlnewwindow",
      "Classe_" +
        this.authService.getNomGroupe() +
        "_" +
        this.monecole +
        "_" +
        obj.nomC +
        ".pdf"
    );
    window.open(doc.output("bloburl"), "_blank");
  }
  //exportation excel
  exportationExcel() {
    let tab = [];
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      tab.push({
        "Nom Classe": element.nomC||" ",
        abrege: element.abrege||" ",
        Niveau: element.Niveaux ? element.Niveaux.libelleN : " ",
        Decoupage: element.Decoupage ? element.Decoupage.libelleD : " "
      });
      if (index == this.data.length - 1) {
        this.excel.downloadExcel(
          tab,
          "Classe" + this.authService.getNomGroupe() + "_" + this.monecole
        );
      }
    }
  }
  ngOnInit() {}
  opencreateclasse() {
    this.sidebar.opencreateclasse();
  }
  openupdateclassModal(classe) {
    this.sidebar.openupdateclassModal(classe);
    this._toggleSidebar();
  }
  opendeleteclassModal(classe) {
    this.newclass = {
      id: classe.id,
      nomC: classe.nomC,
      abrege: classe.abrege,
      idDecoupage: classe.Decoupages,
      formatNotation: classe.formatNotation,
      icone: classe.icone,
      matiere_ens: []
    };
  }
}
