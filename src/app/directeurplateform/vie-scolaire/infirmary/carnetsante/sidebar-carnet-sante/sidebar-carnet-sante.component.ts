import { AmazingTimePickerService } from 'amazing-time-picker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit ,Output,Input ,EventEmitter,OnChanges} from '@angular/core';
import {NgForm} from '@angular/forms';
import {GroupeAndRegroupingService} from '../../../../../services/groupe-and-regrouping.service';
import { Observable} from 'rxjs/Rx';
import { Http ,ResponseContentType} from '@angular/http';
import { Infermerie} from "../../../../../modelsDirecteurPlateform/infermerie.model";
import { Carnet } from "../../../../../modelsDirecteurPlateform/carnet.model"
import { Carnetsante } from "../../../../../modelsDirecteurPlateform/carnetsante.model"
import {InfermerieService} from "../../../../../services/infermerie.service";
import {saveAs} from 'file-saver'
import {AuthService} from "../../../../../services/auth.service";
import { identifierModuleUrl } from '@angular/compiler';
@Component({
  selector: 'sidebar-carnet-sante',
  templateUrl: './sidebar-carnet-sante.component.html',
  styleUrls: ['./sidebar-carnet-sante.component.css',
  '../../../../../../assets/css/infermerie.css']
})
export class SidebarCarnetSanteComponent implements OnInit {
  

  @Input() carnet:Carnet=new Carnet();
  @Input() dataMalade
  @Input() course: any = {};
  @Input() voir: any = false;
  @Output() update = new EventEmitter<boolean>();
  @Input()  listenoncarnet 
  @Input() mode 
  @Input() datalistcarnet
  add:any=true;
  listcl :any=[];
  eleves : any =[];
  carnets : any =[];
  accompagnateur:any={}
  currenteleve:any={}
  currentacc:any={};
  currentlistcarrent:any={}
  currentCarnet:any={};
  listcarnet:any=[];
  carn :any;
  ajoutlistecarnet:any
  selectedFile: File = null;
  tmp: any = 1;

  carnetsante :any={
    idE : null,
    idEleve : null,
    observation : '',
    allergie :'',
    responsable1 :'',
    tel1 : '',
    responsable2 :'',
    tel2 : '',
    DocumentMedical: '',
  }
  
  listclass:any={ }
  hidden : boolean = false
  constructor( private authservice:AuthService ,private students : GroupeAndRegroupingService , private http : Http , private eleve : GroupeAndRegroupingService,private infermerie :InfermerieService) { }

  ngOnInit() {
this.listenoncarnet
  }

  initSidebar(idclass){
    this.infermerie.geteleveobservation(idclass).subscribe(res=>{
      console.log("resss",res);
      this.carnetsante=res

      if (this.carnetsante.DocumentMedical != ''){
        this.hidden = true
      }
    })
  }





  prepare(idclass){
    console.log(idclass);
    this.infermerie.getelevecarnetClasse(idclass).subscribe(listecarnet=>{
      console.log("list des eleve qui non pas carnet ",listecarnet);
      this.ajoutlistecarnet = listecarnet
    })


  }




  onSubmit(form :NgForm){
    if (form.value.idEleve == null){
      this.infermerie.ajoutcarnet(form.value).subscribe(data=>{
        this.resetForm();
        this.infermerie.getcarnet()
      })

    }

else {
  this.infermerie.putcarnet(form.value.idEleve)
}
  }


  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.infermerie.Listecarnet= {
      idE : null,
      idEleve :this.ajoutlistecarnet.idEleve,
      observation : '' ,
      allergie : '' ,
      responsable1 : '' ,
      tel1 : '',
      responsable2 : '' ,
      tel2 : '' , 
      DocumentMedical: ''
    }
  }


  
  oneleve( idCarnet : number){
    this.eleves=[]

   this.infermerie.getcarnetsante(idCarnet).subscribe(eleves =>{
      console.log("le eleves",eleves);

        this.eleves=eleves;

    })
  }


  onlistcarnet(idclass){

    this.infermerie.getcarnetsante(idclass).subscribe(listeleve=>{
console.log("listelevecarnet",listeleve)
this.listclass = listeleve
    })
  }



  Download(DocumentMedical) {

  }
  onFicheSelected(event) {
    console.log(event.target.files[0]);
    this.tmp = "tmp";
    this.selectedFile = <File>event.target.files[0];
    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    this.http.post(this.authservice.getSubDomain() + "/upload", fd)
      .subscribe(res => {
        console.log("res", res);
        //  this.carnetsante.DocumentMedical = res;
        this.infermerie.Listecarnet.DocumentMedical = res.toString();
      });
  }
  Modifierlistecarnet(){

  }
  
  
}
