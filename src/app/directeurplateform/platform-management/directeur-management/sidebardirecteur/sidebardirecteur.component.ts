import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter,
  Output
} from "@angular/core";
import { FormGroup, FormControl, FormArray, NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Personnels } from "../../../../models/PersonnelDirecteur";
import { CompteProService } from "../../../../services/comptePro.service";
import { AuthService } from "../../../../services/auth.service";
import { NgxInputFileUploadComponent } from "ngx-input-file-upload";
import { DirecteurComponent } from "../directeur.component";
@Component({
  selector: "app-sidebardirecteur",
  templateUrl: "./sidebardirecteur.component.html",
  styleUrls: ["./sidebardirecteur.component.css"]
})
export class SidebardirecteurComponent implements OnInit {
  @Input() personnel: Personnels = new Personnels();
  @Input() mode: any;
  @Output() data = new EventEmitter<boolean>();

  @ViewChild(NgxInputFileUploadComponent)
  private NgxInputFileUploadComponent: NgxInputFileUploadComponent;
  @ViewChild("formulaire") private formulaire: NgForm;
  acceptHtml = "image/*";
  acceptTs = /image-*/;
  activeColor: string = "#3366CC";
  selectedFile: File = null;
  tmp: any = "";
  pathavatar: any = "";
  constructor(
    private directeurService: CompteProService,
    private authservice: AuthService,
    private http: HttpClient,    
  ) {
    // this.personnel.estAdmin = true;
    // this.personnel.messagerie = true;
  }

  ngOnInit() {}
  viderControLeForm() {
    this.formulaire.resetForm();
    this.personnel.avatar=''
  }
  ajouterDirecteur(personnel) {
    personnel.idEcole = (this.authservice.getIdSelectedEcole()).toString();
 
    console.log("personnel" , personnel);
    if (this.mode == "create") {
      console.log("nomCreate" + personnel.nom);
      this.directeurService.ajouterDirecteur(personnel).subscribe(resp => {
        console.log(resp);
        
        this.viderControLeForm();
        this.data.emit(true);
      });
    } else if (this.mode == "update") {
      console.log("nomUpdate" + personnel.nom);
      this.directeurService.modifierDirecteur(personnel).subscribe(resp => {
        this.data.emit(true);
      });
    }
  }
  onupPhotoEtablissementSelected(event) {
    this.tmp = "tmp";
    this.selectedFile = <File>event.target.files[0];
    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    this.http
      .post(this.authservice.getSubDomain() + "/upload", fd)
      .subscribe(res => {
        //appeler service d'upload l'image et retourner le nom comme resultat
        console.log("res", res);
        this.personnel.avatar = res;
      });
  }
}
