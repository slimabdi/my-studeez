import { Component, OnInit } from '@angular/core';
import {ParentService} from "../../services/parent.service";
import{HttpClient} from '@angular/common/http';
import {EleveService} from "../../services/eleve.service";
import {Parent} from "../../models/parent";
import {AuthService} from "../../services/auth.service";

import 'jspdf-autotable';
import {ExelDownloadService} from "../../services/exel-download.service";
declare var jsPDF: any;
import {EcoleService} from "../../services/ecole.service";
declare var jsPDF: any;
@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css']
})
export class ParentsComponent implements OnInit {

  id: any = '';
  nomP: any = '';
  prenomP: any = '';
  adressePostaleP: any = '';
  signiatureP: any = '';
  presentationP: any = '';
  penseBeteP: any = '';
  civiliteP: any = '';
  creePar: any = '';
  modifiePar: any = '';
  createdAt: any = '';
  updatedAt: any = '';
  idCU: any = '';
  tel1: any = '';
  tel2: any = '';
  emailP: any = '';
  prof: any = '';
  idE: any = '';
  complementAdresse: any = '';
  ville: any = '';
  codePostale: any = '';
  lienPrente: any = '';
  login: any = '';
  password: any = '';
  password2: any = '';
  nomE: any = '';
  termP: any = '';
  tmpparent : any= {};
  tmpeleveParent : any= {};
  hide = true;
  pathAvatar: any='';
  avatar: any='';
  parents: any = {};
  ListParent: any = {};
  ecoles: any = [];
  listParentEleve: any =[];
  selectedFile: File= null;
  nbre_parents : any= '';
  avatarr: any = '';
  term: any = '';
  longeur: any = '';

  selectModel:any=null;
  //tmp:any=null;
  tmp:any=''

  successAdd:any='';
  connectedUser:any='';
  dateDeconx: any='';


  public data:any=[]
  myobject:any={}
  loader:any=false
  constructor(private exel:ExelDownloadService,private parentService: ParentService , private authServ: AuthService, private http: HttpClient , private eleveService :EleveService ,private ecoleService: EcoleService   )
  {


    this.ListParent = [];
    //this.listParentEleve = this.parentService.getParentEleve(this.id);
    ecoleService.getEcoles(authServ.getNomGroupe()).subscribe(res=>{
      this.ecoles=res
    })

    //this.authServ.getIdSelectedEcole();
    //date dernière connexion
    this.connectedUser=authServ.getConnectedUser();
    let dateValue=Date.parse( this.connectedUser['derniereCnx']);
    this.dateDeconx=new Date(dateValue).toLocaleString();
    console.log("date deconx",this.dateDeconx);
  }



  ngOnInit() {

    this.authServ.getgroupe().subscribe(res => {
      console.log(res);
      this.selectModel = null;
      this.data = [];
      if (res.id || this.selectModel) {
        if (res.id != "null") {
          this.ecoles = [];
          console.log(res.id);
          this.loader = true;
          this.selectModel = this.authServ.getIdSelectedEcole();
          if (this.selectModel) {
            this.loader=true
            this.parentService.getListParentsEcole().subscribe(res=>{
              console.log(res);
              this.data=res
              this.loader=false
            })

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

  deleteParent(id)
  {
    console.log("parent id",id)
    this.parentService.deleteParent(id).subscribe(res => {
      //console.log(res);
    });

    setTimeout(()=>{
      this.ListParent = this.parentService.getListParentsEcole().subscribe(res=>{
        console.log(res);
        this.data=res
        this.loader=false
      })


    },2500);

  }

  modalSupp(tmpparent){
    this.tmpparent=tmpparent;
  }

  modalSupprimeEleve(tmpeleveParent){
    this.tmpeleveParent=tmpeleveParent;
  }



  ModalAfficheParent(parent)
  {
    var indexAvatar = parent.avatar.lastIndexOf("/");
    this.tmp = parent.avatar.substr(0,indexAvatar);

    this.pathAvatar = parent.avatar.substr(indexAvatar + 1);

    this.id=parent.id;
    //this.avatar=avatar;
    this.nomP=parent.nomP;
    this.prenomP=parent.prenomP;
    this.tel1=parent.tel1;
    this.tel2=parent.tel2;
    this.emailP=parent.emailP;
    this.adressePostaleP=parent.adressePostaleP ;
    this.lienPrente=parent.lienPrente;
    this.complementAdresse=parent.complementAdresse;
    this.ville=parent.ville;
    this.codePostale=parent.codePostale;
    this.login=parent.login;
    this.password=parent.password;
    this.password2=parent.password2;
    this.prof=parent.prof;
    this.idE=parent.idE;
    //this.listParentEleve = this.parentService.getParentEleve(id);


    this.listParentEleve = this.parentService.getParentEleve(this.id).subscribe(res=>{
      console.log(res);
      this.listParentEleve=res
      //this.loader=false
    })
  }
  updateParent(parent)
  {
    console.log(parent);

    this.parentService.updateParent(parent);

    setTimeout(()=>{

      this.successAdd = "Mise à jours parent «" + parent.nomP + "» enregistré";

      this.ListParent = this.parentService.getListParentsEcole().subscribe(res=>{
        this.data=res
        this.loader=false
      })

    },2000);

    setTimeout(()=>{
      this.successAdd=" ";
    },5000);

  }

  estNonVidee(chaine){
    if(chaine == "" || chaine == null){

      return false;
    }else{return true;}
  }
  onAvatarSelected(event){
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

    this.http.post(this.authServ.getSubDomain()+"/upload",fd).subscribe(res =>{
      console.log("res",res);
      // (<HTMLInputElement>document.getElementById("path").value) = res.name;
      this.pathAvatar=res;

    })

  }



  uponIconeSelected(event){
    this.tmp='tmp'
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
    this.http.post(this.authServ.getSubDomain()+"/upload",fd).subscribe(res =>{
      console.log("res",res);
      // (<HTMLInputElement>document.getElementById("path").value) = res.name;
      this.pathAvatar=res;

    })

  }

  deleteParentEleve(id) {
    this.eleveService.deleteEleve(id).subscribe(res => {
    });
    this.listParentEleve = this.parentService.getParentEleve(id);
    console.log(this.listParentEleve);
  }

  exportationExcel(){

    let tab =[]
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      tab.push({
        'Nom ':element.nomP||" ",
        'Prénom':element.prenomP||" ",

      })
      if(index==this.data.length-1){
        this.exel.downloadExcel(tab,'Parents_'+this.authServ.getNomGroupe()+'_'+this.selectModel)
      }
    }
  }

  //imprimer pdf
  generationPDF() {


    this.http.get<Parent[]>(this.authServ.getSubDomain()+"/parentsEcole/"+this.authServ.getNomGroupe()+"/"+this.authServ.getIdSelectedEcole()).subscribe(parents =>
    {
      var columns = [
        {title: "Nom  ", dataKey: "nomP"},
        {title: "Prénom", dataKey: "prenomP"},
        {title: "Adresse", dataKey: "adressePostaleP" +""+"complementAdresse"+""+"ville"+""+"codePostale"},
      ];
      var doc = new jsPDF('l', 'mm', [297, 210]);
      doc.autoTable(columns, parents, {
        theme: 'grid',
        styles: {
          overflow: 'linebreak',
          fontSize: 7},

        margin: {top: 22},
        addPageContent: function(data) {
          doc.text("Liste des Parents",128,15);
        }
      });

      doc.autoPrint()
      doc.save('parents.pdf');
      //doc.output('dataurlnewwindow');
      doc.output('dataurlnewwindow','parents.pdf');
      window.open(doc.output('bloburl'), '_blank');
    });

  }

  viewListParents(event){
    console.log("event",event.target.value);
    this.loader=true
    this.authServ.setIdSelectedEcole(event.target.value);
    this.ListParent = this.parentService.getListParentsEcole().subscribe(res=>{
      console.log(res);
      this.data=res
      this.loader=false
    })


  }
  Effacer_Recherche(){
    this.term='';
  }
  isSelected(id){

    if (id === Number(this.authServ.getIdSelectedEcole())){
      return true;

    }
    return false;
  }


}
