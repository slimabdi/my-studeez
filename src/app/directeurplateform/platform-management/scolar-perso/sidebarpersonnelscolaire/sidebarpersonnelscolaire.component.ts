import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter,
  Output
} from "@angular/core";
import { Personnels } from "../../../../models/PersonnelDirecteur";
import { CompteProService } from "../../../../services/comptePro.service";
import { AuthService } from "../../../../services/auth.service";
import { ClasseService } from "../../../../services/classe.service";
import { NgxInputFileUploadComponent } from "ngx-input-file-upload";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-sidebarpersonnelscolaire",
  templateUrl: "./sidebarpersonnelscolaire.component.html",
  styleUrls: ["./sidebarpersonnelscolaire.component.css"]
})
export class SidebarpersonnelscolaireComponent implements OnInit {
  @ViewChild(NgxInputFileUploadComponent)
  private NgxInputFileUploadComponent: NgxInputFileUploadComponent;
  @Input() personnel: Personnels = new Personnels();
  @Input() mode: any;
  @Input() rang: any;
  @ViewChild("formulaire") private formulaire: NgForm;

  InfoGeneral: boolean;
  droits: boolean;
  data2: any = [];
  classe: any;
  tmp: any = "";
  i: number = 0;
  selectedFile: File = null;
  pathavatar: any = "";

  constructor(
    private personnelService: CompteProService,
    private authservice: AuthService,
    private classservice: ClasseService,
    private http: HttpClient
  ) {
    this.personnel.estAdmin = true;

  }

  onupPhotoEtablissementSelected(event) {
    this.tmp = "tmp";
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
      .post(this.authservice.getSubDomain() + "/upload", fd)
      .subscribe(res => {
        //appeler service d'upload l'image et retourner le nom comme resultat
        console.log("res", res);
        this.pathavatar = res;
      });
  }
  ngOnInit()
  {
    this.classservice.getClassesbyidEcole(7).subscribe(res => {
      this.data2 = res;

    });
  }
  ajouterPersonnel(personnel) {
    personnel.idEcole = this.authservice.getIdSelectedEcole();
    personnel.affichClasses = this.rang;

    if (this.mode == "create") {
      console.log("personnel à crééer");
      this.personnelService.ajouterPersonnel(personnel).subscribe(resp => {
        this.data2.emit(true);
      });
    } else if (this.mode == "update") {
      console.log("update" + personnel.nom);
      this.personnelService.updatePersonnel(personnel).subscribe(resp=>{
        console.log(resp);

        this.data2.emit(true);
      })
    }
  }

  afficherIG() {
    this.InfoGeneral = true;
    this.droits = false;
    this.rang = [];
  }
  reinitialiser() {
    this.personnel = new Personnels();
    this.InfoGeneral = true;
    this.droits = false;
    this.rang = [];
    this.formulaire.resetForm();
  }
  afficheDP() {
    console.log("passage");
    this.InfoGeneral = false;
    this.droits = true;
  }
  ajouterClasse(Classe) {
    console.log("Classe" + Classe);
    for (let i = 0; i < this.rang.length; i++) {
      if (Classe == this.rang[i]) {
        return;
      }
    }
    this.rang.push(Classe);
    console.log("ranggggg" + this.rang);
    this.i++;
  }
  suppClasse(ii) {
    this.i = ii;
    this.i--;

    this.rang.splice(this.i, 1);
  }
  viderControLeForm() {
    this.formulaire.resetForm();
  }
}
