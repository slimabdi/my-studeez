import { AmazingTimePickerService } from 'amazing-time-picker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit ,Output,Input ,EventEmitter ,HostListener} from '@angular/core';
import {NgForm} from '@angular/forms';
import {GroupeAndRegroupingService} from '../../../../../services/groupe-and-regrouping.service';
import { Observable} from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Infermerie} from "../../../../../modelsDirecteurPlateform/infermerie.model";
import { Carnet } from "../../../../../modelsDirecteurPlateform/carnet.model"
import {InfermerieService} from "../../../../../services/infermerie.service";
import { ToastNoAnimation } from 'ngx-toastr';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'sidebarinfirmary',
  templateUrl: './sidebarinfirmary.component.html',
  styleUrls: ['./sidebarinfirmary.component.css']
})
export class SidebarinfirmaryComponent implements OnInit {

  @Output() ajout = new EventEmitter<boolean>();
  @Input() x = []
  @Input() mode
  @Input() dataMalade;
  @Output() listcl
  message : '';
  add:any=true;
  carnet:any=false;
  eleves : any =[];
  carnets : any =[];
  accompagnateur:any={}
  currenteleve:any={}
  currentacc:any={};
  currentCarnet:any={};
  listcarnet:any=[];
 selectcarnet :Carnet;
 carnetsante:any={}
 carnetexist:any=false
 hide: boolean;
 display='none';
  constructor( private route :Router ,private students : GroupeAndRegroupingService , private http : Http , private eleve : GroupeAndRegroupingService,private infermerie :InfermerieService) { }

  ngOnInit() {
    this.students.getclasses().subscribe(listcl=>{
      this.listcl= listcl;
      console.log("slimmm",listcl); 
      console.log("slimmm")
    });
    this.resetForm();

  }


  toggle() {
    this.hide = !this.hide;
  }



  onSubmit(form :NgForm , x){
    form.value.idclass = this.infermerie.x.idclass;
    if(this.mode=='create') {

      this.infermerie.ajouterinfermerie(form.value).subscribe(data=>{
        this.resetForm();
        this.infermerie.getInfermerie()
      })

    }
    else if(this.mode=='update')
    {

      this.infermerie.putinfermier( this.listcl.idC);
      this.infermerie.getInfermerie()
    }
  }

  prepare(passage){
    console.log(passage);
    this.infermerie.x.idclass=passage.idClasse
    this.infermerie.x.idEleve=passage.idEleve
    this.infermerie.x.accompagnateur=passage.id    
    this.infermerie.x.HEntree = passage.HEntree
    this.infermerie.x.HSortie = passage.HSortie;
    this.infermerie.x.decision = passage.decision
    this.infermerie.x.date =passage.date
   this.oneleve(passage.idClasse)

  }
  openModal(){
    this.display='block'; 
 }

 
  voircarnetPassage(id){
    console.log('hello');
    
    this.infermerie.getcarnetPassage(id).subscribe(res=>{
      console.log(res.error);
    this.carnet=true;
      
      if( res.error ){
       this.add=true;
       this.carnetexist=false;

      //  this.openModal();
      //  this. showpopup()
      }
      else{
        console.log(res);
        this.add=false;
       this.carnetexist=true
        this.carnetsante=res;
        this.mode = false
      }
    })
  }
  ajoutercarnet(){

    this.route.navigate(['/directeurplateform/scholar-life/infirmerie/carnet']);
  }

  oneleve( id : number){
    this.eleves=[]

   this.eleve.getStudents(id).subscribe(eleves =>{
      console.log("le eleves",eleves);
      if (!eleves.error){
        this.eleves=eleves;

      }else{
        this.eleves=[]
      }

    })
  }
  
  log = '';
  logCheckbox(element: HTMLInputElement): void {
    this.log += `Checkbox ${element.value} was ${element.checked ? '' : 'un'}checked\n`;
  }
  getStudentinfo(){
    this.eleves.forEach(element => {
      if(element.idE==this.infermerie.x.idEleve){
        this.currenteleve=element;
        this.infermerie.getcarnet().subscribe(carnets=>{
          this.carnets = carnets;
        })
        console.log('elelve',element);
      console.log("list de carnet" , this.carnets )
      }
    });
  }
  getaccompagnateur(){
this.eleves.forEach(elementacc=>{
  if(elementacc.accompagnateur==this.accompagnateur){
    this.currentacc=elementacc;
    
    console.log('Accompagnateur',elementacc)
  }
})
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.infermerie.x= {
      idEleve : null ,
      date: null,
      HSortie: "",
      HEntree : "",
      decision: "",
      accompagnateur: null,
      nomGroupe:"",
      idclass : null
    }
  }

}
