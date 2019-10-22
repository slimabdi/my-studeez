import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, Type, NgModule} from '@angular/core';
import {EleveService} from "../../services/eleve.service";
import {EcoleService} from "../../services/ecole.service";
import {ClasseService} from "../../services/classe.service";
import {MatiereService} from "../../services/matiere.service";
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {BrowserModule} from "@angular/platform-browser";

import 'jspdf-autotable';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {ParentService} from "../../services/parent.service";
import {Eleve} from "../../models/eleve";
import {Classe} from "../../models/classes";
import {Matiere} from "../../models/matieres";
import {ExelDownloadService} from "../../services/exel-download.service";
declare var jsPDF: any;

@Component({
  selector: 'app-eleves',
  templateUrl: './eleves.component.html',
  styleUrls: ['./eleves.component.css'],
})

export class ElevesComponent implements OnInit {
  // déclaration des variables
  id: any = '';
  nom: any = '';
  avatar: any = '';
  prenom: any = '';
  dateN: any = '';
  INE: any = '';
  civilite: any = '';
  adressePostale: any = '';
  signature: any = '';
  presentation: any = '';
  penseBete: any = '';
  genre: any = '';
  creePar: any = '';
  modifiePar: any = '';
  createdAt: any = '';
  updatedAt: any = '';
  idCU: any = '';
  term:any ='';
  login: any = '';
  password: any = '';
  equalTo: any = '';
  confirmPassword: any = '';
  listEleve : any= {};
  listClasses : any= [];
  listMatieresOptionnels : any= [];
  eleves : any= '';
  e : any= {};
  nomE :any= {};
  idEcole: any = '';
  idEleve: any = '';
  idClasse: any = '';
  idCompteUser: any = '';
  ecoles :any=[];
  matieres :any=[];
  ecoleseleves :any={};
  abrege: any = '';
  dateSortie: any = '';
  motifSortie: any = '';
  dateEntree: any = '';
  redoublant: any = '';
  provenance: any = '';
  infoParents: any = '';
  nomMatiere: any = '';
  idMatiere: any = '';
  idC: any = '';
  classes : any= {};
  empty=[];
  hide = true;
  selectedMatiere: string = '';
  selectedNom: string = '';
  selectedEcole: string = '';
  selectedEmail: any ;
  selectedEmailUp: any ;
  listMatieres: string = '';
  selectModel:any='';
  selectGroup:any='';
  successAdd: any='';
  idE: any='';
  tmpeleve : any= {};
  tmpParent : any= {};

  listMatiereEleve: any = {};
  _ref:any;
  value: string = '';
  pathAvatarEleve: any='';
  connectedUser:any='';
  dateDeconx: any='';
  public data:any=[]
  public listParentEleve:any=[]
  myobject:any={}
  loader:any=false

  selectedFile: File= null;
  list:any=[];
  listP:any={};
  listParent:any=[];
  listParentUp:any=[];

  public dataMatieres:any=[];

  pathupAvatar:any='';
  myselectmatiere:  any;
  myParent:  any;
  EmailParent:  any;


  listUp:any=[]
  Upmyselectematiere:  any;
  public invoiceForm: FormGroup;
  password2: any='';
 tmp: any='';
  @ViewChild('form')
  private form: FormGroup;

  components = [];
  constructor(private exel:ExelDownloadService,private _fb: FormBuilder,private _cfr: ComponentFactoryResolver,private eleveService: EleveService, private ecoleService :EcoleService, private classeService :ClasseService , private matiereService :MatiereService ,private authService : AuthService ,private http: HttpClient,private parentService:ParentService) {

    this.listEleve = [];

    this.ecoleseleves= [];
    ecoleService.getEcolesSimple(authService.getNomGroupe()).subscribe(res=>{
      this.ecoles = res
    })


    this.listMatiereEleve=[];


    //date dernière connexion
    this.connectedUser=authService.getConnectedUser();
    let dateValue=Date.parse( this.connectedUser['derniereCnx']);
    this.dateDeconx=new Date(dateValue).toLocaleString();
    console.log("date deconx",this.dateDeconx);

  }
  onAvatarSelected(event){

    const $ = window["$"];

    $(function () {
      $('[data-toggle="tooltip"]').tooltip({
        animated: 'fade',
        placement: 'right',
        html: true
      });
    });

    this.selectedFile=<File>event.target.files[0];
    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post(this.authService.getSubDomain()+"/upload",fd).subscribe(res =>{
      console.log("res",res);
      this.pathAvatarEleve=res;


    })
  }

  /*ngOnInit() {

    this.authService.getgroupe().subscribe(res => {
      console.log("groupe",res);
      //this.selectModel=null
      this.selectGroup=res.id
      this.data=[]
      if(res.id || this.selectModel ){

        if(res.id){
          this.loader=true
          this.selectModel = this.authService.getIdSelectedEcole();
          if (this.selectModel) {
            this.listEleve = this.eleveService.getListElevesEcole().subscribe(res=>{
              console.log(res);
              this.data=res
              this.loader=false
            })
            this.idE=this.authService.getIdSelectedEcole();
          }
          this.ecoleService.getEcoles(res.id).subscribe(res=>{
            console.log(res);
            this.loader=false
            this.ecoles = res
          })
        }
        else{
          this.ecoleService.getEcoles(this.authService.getNomGroupe()).subscribe(res=>{
            console.log(res);
            this.ecoles = res
            this.loader=false
          })
        }
      }
    })


  }*/


  ngOnInit() {

    this.authService.getgroupe().subscribe(res => {
      console.log(res);
      this.selectModel = null;
      this.data = [];
      if (res.id || this.selectModel) {
        if (res.id != "null") {
          this.ecoles = [];
          console.log(res.id);
          this.loader = true;
          this.selectModel = this.authService.getIdSelectedEcole();
          if (this.selectModel) {
            this.loader=true
            if (this.selectModel) {
              this.listEleve = this.eleveService.getListElevesEcole().subscribe(res=>{
                console.log(res);
                this.data=res
                this.loader=false
              })
              this.idE=this.authService.getIdSelectedEcole();
            }

          }
          // this.loader=true
          this.ecoleService.getEcoles(res.id).subscribe(res=>{
            console.log(res);
            this.loader=false
            this.ecoles = res
          })
        } else {
          this.data = [];
          this.loader = false;
          this.ecoles = [];


        }
      }
    });
  }

  initItemRows() {
    return this._fb.group({
      itemname: ['']
    });
  }

  addNewRow()
  {
    this.list.push(this.myselectmatiere);
    this.myselectmatiere=null
  }

  deleteRow(index: number) {
    let table= this.list
    this.list=[]
    for(let i=0;i<table.length;i++){
      if(i!=index){
        this.list.push(table[i])
      }
    }
  }



  //ajouter un parent
  addNewParent() {
    console.log("this.selectedEmail", this.selectedEmail);

    this.listParent.push(this.selectedEmail);
    this.selectedEmail = null

  }

  addNewParentUp() {
    console.log("this.selectedEmail", this.selectedEmailUp);
    this.listParentUp.push(this.selectedEmailUp);
    this.selectedEmailUp = null

  }




  AddEleve(eleve){
    console.log(eleve);
    this.eleveService.AddEleve(eleve);

    setTimeout(()=>{
      this.successAdd="Nouveau élève «"+eleve.nom+"» enregistré";
      this.listEleve= this.eleveService.getListElevesEcole().subscribe(res=>{
        console.log(res);
        this.data=res;
      })
    },2000);
    setTimeout(()=>{
      this.successAdd=" ";
    },5000);

  }
  estNonVidee(chaine){
    if(chaine == "" || chaine==null){
      //console.log("La chaîne est vide");
      return false;
    }else{return true;}
  }

  //event handler for the select element's change event
  selectMatiere (event: any)
  {

    localStorage.setItem('whatever', event.target.value);
    localStorage.setItem('ListMatieres', event.target.value);

    this.selectedMatiere = event.target.value;

  }
  selectNom (event: any)
  {
    this.selectedNom = event.target.value;
  }



    selectEcole (event: any,idecole)
    {
      this.selectedEcole = event.target.value;
      this.idEcole=idecole;

      this.http.get<Classe[]>(this.authService.getSubDomain() + "/classes/" + idecole +"/"+ this.authService.getNomGroupe()  ).subscribe(res => {
        this.listClasses = res;

      });
      this.http.get<Matiere[]>(this.authService.getSubDomain() + "/matiereopts/" + idecole +"/"+ this.authService.getNomGroupe()  ).subscribe(res => {
        this.listMatieresOptionnels = res;

      });


  }



  selectEmail (event: any)
  {

    this.selectedEmail = event.target.value;

  }
//ajouter matiere optionnele pour l'élève


  // list des matieres selon id  d'ecole selectionner
  viewListEleves(event){

    console.log("event",event.target.value);
    this.loader=true
    this.authService.setIdSelectedEcole(event.target.value);
    this.listEleve = this.eleveService.getListElevesEcole().subscribe(res=>{
      console.log(res);
      this.data=res
      this.loader=false
    })
    this.idE=this.authService.getIdSelectedEcole();
  }

  isSelected(id){

    if (id === Number(this.authService.getIdSelectedEcole())){
      return true;

    }
    return false;
  }
  // méthode suppresion élève seoln son 'id'
  deleteEleve(id) {

    console.log("delete eleve component id = " , id);


    this.eleveService.deleteEleve(id).subscribe(res => {
      this.listEleve=this.eleveService.getListElevesEcole().subscribe(res=>{
        this.data=res
        console.log(this.data)
      })
    });
  }

  modalSupp(tmpeleve){
    this.tmpeleve=tmpeleve;
  }

  //update

  updateAvatar(event){
    this.tmp='tmp';
    const $ = window["$"];


    $(function () {
      $('[data-toggle="tooltip"]').tooltip({
        animated: 'fade',
        placement: 'right',
        html: true
      });
    });
    this.selectedFile=<File>event.target.files[0];
    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post(this.authService.getSubDomain()+"/upload",fd).subscribe(res =>{
      console.log("res",res);
      this.pathupAvatar=res;
    })
  }

  upAddNewRow() {
    this.listUp.push(this.Upmyselectematiere);
    this.Upmyselectematiere=null
  }

  upDeleteRow(index: number) {
    let table= this.dataMatieres
    this.dataMatieres=[]
    for(let i=0;i<table.length;i++){
      if(i!=index){
        this.dataMatieres.push(table[i])
      }
    }
  }
  upDeleteRow2(index: number) {
    let table= this.listUp
    this.listUp=[]
    for(let i=0;i<table.length;i++){
      if(i!=index){
        this.listUp.push(table[i])
      }
    }
  }


  ModalAfficheEleve(id,avatar,nom,prenom,adressePostale,INE,dateN,nomE,abrege,redoublant,provenance,dateEntree,dateSortie,motifSortie,
                    login,password)
  {
    this.id=id;
    var indexAvatar = avatar.lastIndexOf("/");
    this.tmp=avatar.substr(0,indexAvatar);
    this.pathupAvatar=avatar.substr(indexAvatar+1);
    //this.avatar=avatar;
    console.log(id);
    this.nom=nom;
    this.prenom=prenom;
    this.adressePostale=adressePostale ;
    this.INE=INE ;
    this.dateN=dateN ;
    this.nomE=nomE ;
    this.abrege=abrege ;
    this.redoublant=redoublant ;
    this.provenance=provenance ;
    this.dateEntree=dateEntree ;
    this.dateSortie=dateSortie ;
    this.motifSortie=motifSortie ;
    this.login=login ;
    this.password=password ;
    this.password2=password;


    //console.log(id);

    this.listParentEleve  =this.http.get<Eleve[]>(this.authService.getSubDomain() + "/parentseleves/"+ id + "/"+this.authService.getNomGroupe()  ).subscribe(res => {
      this.listParentEleve = res;
    });


  //  this.dataMatieres=[];
    this.http.get<Eleve[]>(this.authService.getSubDomain()+"/matiereseleves/"+this.id+"/"+this.authService.getNomGroupe()).subscribe(res=>{

      this.dataMatieres=res
      console.log(this.dataMatieres)
    })



  }


  updateEleve(eleve)
  {
    console.log("update component " , eleve.id);

    this.eleveService.updateEleve(eleve);

    setTimeout(()=>{
      this.successAdd = "Mise à jours élève «" + eleve.nom + "» enregistré";
      this.listEleve= this.eleveService.getListElevesEcole().subscribe(res=>{
       // console.log(res);
        this.data=res;
      })
    },2000);
    setTimeout(()=>{
      this.successAdd=" ";
    },5000);


  }


  exportationExcel(){
    let tab =[]
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      tab.push({
        'Nom ':element.nom||" ",
        'Prénom':element.prenom||" ",
      })
      if(index==this.data.length-1){
        this.exel.downloadExcel(tab,'Eleves_'+this.authService.getNomGroupe()+'_'+this.selectModel)
      }
    }
  }

  //imprimer pdf
 generationPDF() {

    this.http.get<Eleve[]>(this.authService.getSubDomain()+"/elevesEcole/"+this.authService.getNomGroupe()+"/"+this.authService.getIdSelectedEcole()).subscribe(eleves =>
    {
      var columns = [
        {title: "Nom  ", dataKey: "nom"},
        {title: "Prenom", dataKey: "prenom"},

      ];

      var doc = new jsPDF('l', 'mm', [297, 210]);
      doc.autoTable(columns, eleves, {
        theme: 'grid',
        styles: {
          overflow: 'linebreak',
          fontSize: 7},

        margin: {top: 22},
        addPageContent: function(data) {
          doc.text("Liste des eleves",128,15);
        }
      });

      doc.autoPrint()
      doc.save('eleves.pdf');
      //doc.output('dataurlnewwindow');
      doc.output('dataurlnewwindow','ecoles.pdf');
      window.open(doc.output('bloburl'), '_blank');
    });

  }


  remove()
  {
    this._ref.destroy();
  }

  deleteRowParent(index: number) {
    let table= this.listParent
    this.listParent=[]
    for(let i=0;i<table.length;i++){
      if(i!=index){
        this.listParent.push(table[i])
      }
    }
  }
  deleteRowParentUp(index: number) {
    let table= this.listParentUp
    this.listParentUp=[]
    for(let i=0;i<table.length;i++){
      if(i!=index){
        this.listParentUp.push(table[i])
      }
    }
  }


  modalSupprimeParent(tmpParent){

    this.tmpParent=tmpParent;
  }
  deleteParent(idP) {
    //console.log("delete parent",idP)

    this.parentService.deleteParent(idP).subscribe(res => {

    });
    //console.log("this.id",this.id)
    this.listParentEleve = this.http.get<Eleve[]>(this.authService.getSubDomain() + "/parentseleves/"+ this.id + "/"+this.authService.getNomGroupe()  ).subscribe(res => {
      this.listParentEleve = res;
    });


  }
  Effacer_Recherche(){
    this.term='';
  }

}
