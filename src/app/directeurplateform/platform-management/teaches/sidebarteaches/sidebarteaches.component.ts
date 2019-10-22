import {Component, OnInit, Input, ViewChild, EventEmitter, Output} from '@angular/core';
import {Enseignants} from "../../../../modelsDirecteurPlateform/Enseignants.model.";
import {CompteProService} from "../../../../services/comptePro.service";
import {AuthService} from "../../../../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {Classe} from "../../../../models/classes";
import {Matiere} from "../../../../models/matieres";
import {NgForm} from "@angular/forms";
@Component({
  selector: 'app-sidebarteaches',
  templateUrl: './sidebarteaches.component.html',
  styleUrls: ['./sidebarteaches.component.css']
})
export class SidebarteachesComponent implements OnInit {

  @Input() mode:any;
  @Input() enseignant:Enseignants=new Enseignants();
  @Input() ListClassesEnseignant: any;
  @Input() ListMatieresEnseignant: any;

  @Output() data = new EventEmitter<boolean>();
  @ViewChild("formulaire") private formulaire: NgForm;

  classes:any={};
  listClasses:any=[];
  listMatieres:any=[];
  matieres:any=[];
  idEcole=7;
  myMatiere:any='';
  myClasses:any='';
  InfoGeneral: boolean;
  droits: boolean;
  //avatar
  tmp: any = "";
  i: number = 0;
  selectedFile: File = null;
  pathavatar: any = "";

  constructor(private enseignantService:CompteProService ,private authservice:AuthService,private  http :HttpClient ) {

  this.InfoGeneral=true;

  console.log("this.ListClassesEnseignant",this.ListClassesEnseignant);
  console.log("this.ListMatieresEnseignant",this.ListMatieresEnseignant);
  }

  ngOnInit() {

    //afficher liste des classes dans cette école
    this.http.get<Classe[]>(this.authservice.getSubDomain() + "/classes/" + this.idEcole+"/"+this.authservice.getNomGroupe() ).subscribe(res => {
      this.classes = res;
    });

    this.http.get<Matiere[]>(this.authservice.getSubDomain() + "/matieresSimple/" + this.authservice.getNomGroupe()+ "/"+ this.idEcole  ).subscribe(res => {
      this.matieres = res;

    });
   // console.log(this.enseignant)
  }

  ajouterEnseignant(enseignant){
    enseignant.nomE = this.authservice.getIdSelectedEcole();

    if(this.mode=='create') {

      this.enseignantService.addEnseignant(enseignant);
    }

    else if(this.mode=='update')
    {

      this.enseignantService.updateEnseignant(enseignant);

    }


  }


  addNewRowClass() {
    console.log("add class");
    console.log(this.myClasses);
    this.listClasses.push(this.myClasses);
    console.log( "liste des classes",this.listClasses);
    this.myClasses=null
  }
  deleteRowClass(index: number) {
    let table= this.listClasses
    this.listClasses=[]
    for(let i=0;i<table.length;i++){
      if(i!=index){
        this.listClasses.push(table[i])
      }
    }
  }
  addNewRow() {
    this.listMatieres.push(this.myMatiere);
    this.myMatiere=null

  }
  deleteRow(index: number) {
    let table= this.listMatieres
    this.listMatieres=[]
    for(let i=0;i<table.length;i++){
      if(i!=index){
        this.listMatieres.push(table[i])
      }
    }
  }
  afficherIG() {
    this.InfoGeneral = true;
    this.droits = false;
  }
  afficheDP() {
    console.log("passage");
    this.InfoGeneral = false;
    this.droits = true;
  }
  reinitialiser() {
    this.enseignant = new Enseignants();
    this.InfoGeneral = true;
    this.droits = false;

  }
  //avatar
  onAvatarSelected(event) {
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
}
