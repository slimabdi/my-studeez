import { Component, OnInit ,ElementRef, ViewChild,NgModule} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {GroupeScolaireService} from "../../services/groupe-scolaire.service";
import {EcoleService} from "../../services/ecole.service";
import {Ecoles} from "../../models/ecoles";
import {ImportationExcelService} from "../../services/importation-excel.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GroupeScolaires} from "../../models/groupe-scolaires";
import * as XLSX from 'ts-xlsx';
import{HttpClient} from '@angular/common/http';
import { IOption } from "ng-select";

@Component({
  selector: 'app-importation-excel',
  templateUrl: './importation-excel.component.html',
  styleUrls: ['./importation-excel.component.css']
})
export class ImportationExcelComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;
  public letters: Array<IOption> = [];
  connectedUser:any='';
  dateDeconx: any='';
  ecoles: any=[];
  groupeScolaires: any = [];
  groupeScol: any = [];
  slim : any = [];
  selectModel: any = '';
  selectGroup:any='';
  value:any='';
  nameGroupe:any='';
  matiere: any = {};
  selectedOption: string;
  printedOption: string;
  label:any=''
  col:any=''
  objCorr:any={
    label:'',
    col:''
  }
  options = [
    { name: "option1", value: 1 },
    { name: "option2", value: 2 }
  ]
  fileName:any=[]
  lstCorrespon:any=[
    {col:'A',label:'idE'},
    {col:'B',label:'lastName'},
    {col:'C',label:'firstName'},
    {col:'D',label:'gender'},
    {col:'E',label:'birthdate'},
    {col:'F',label:'class'},
    {col:'G',label:'telParent1'},
    {col:'H',label:'mailParent1'},
    {col:'I',label:'telParent2'},    
    {col:'J',label:'mailParent2'}
  ]
  lstCorresponPossible:Array<IOption>=[
    {label:'Id eleve',value:'idE'},
    {label:'Nom eleve',value:'lastName'},
    {label:'Prénom eleve',value:'firstName'},
    {label:'Genre',value:'gender'},
    {label:'Date de naissance',value:'birthdate'},
    {label:'Classe',value:'class'},
    {label:'Classe',value:'class'},
    {label:'Telephone parent 1',value:'telParent1'},
    {label:'Telephone parent 2',value:'telParent2'},
    {label:'Email parent 1',value:'mailParent1'},
    {label:'Email parent 2',value:'mailParent2'}
  ]
   firstLine:any=1
   myExcel:any=[]
  public result: any;
  private xlsxToJsonService: ImportationExcelService = new ImportationExcelService();
  
  constructor(private http: HttpClient, private authServ: AuthService,private GSservice: GroupeScolaireService,private eco: EcoleService, private fb: FormBuilder) {
    this.createForm();
    
     this.groupeScolaires = GSservice.getGroupeScolaires();

  
    this.connectedUser=authServ.getConnectedUser();
    let dateValue=Date.parse( this.connectedUser['derniereCnx']);
    this.dateDeconx=new Date(dateValue).toLocaleString();
  }
  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      avatar: null
    });
  }
  onSubmit() {

  }
  

  private prepareSave(): any {
    let input = new FormData();
    return input;
  }
    fnct(event){
    console.log("eveeeent"+event.target.value)
    this.eco.getEcolesSimple(event.target.value).subscribe(res=>{
      console.log(res)
      this.ecoles=res;
      console.log("test",this.ecoles);
       this.groupeScolaires = event.value;
    });
}
arrayBuffer:any;
file:File;
addCorr(){
   console.log(this.objCorr.label);
   console.log(this.objCorr.col);
}
handleFile(event) {
  let file = event.target.files[0];
  console.log(event.target);
    
    var filename = event.target.value.substring(event.target.value.lastIndexOf('"\"')+1);  
  
  this.xlsxToJsonService.processFileToJson({}, file).subscribe(data => {
  if(data.sheets){
    this.result=data.sheets.data
    let test= true
     let indexE=this.firstLine
      data.sheets.sheetsNames.forEach((element,index) => {
        test=true
        indexE=this.firstLine
        this.myExcel.push([])           
        while (test) {
         indexE++        
          test=false 
        let sheet = data.sheets.sheets[element]
        let obj={}
             this.lstCorrespon.forEach(list => {
               let i= list.col+indexE.toString()
               if(sheet[i])    {
                 test=true
                obj[list.label]=sheet[i]?sheet[i].w:''
               }   
           });
           
           if((Object.keys(obj)).length!=0){
            this.myExcel[index].push(obj) 
           }
       
          } 
   });
    
    console.log(this.myExcel);

  }
  })

}
  ngOnInit() {
    for (let i = 65; i <= 90; i++) {
      this.letters.push({
        label:String.fromCharCode(i),
        value:String.fromCharCode(i)
      })     
    }
    console.log(this.letters);
    
    //this.groupeScolaires=this.authServ.getNomGroupe();
    this.groupeScolaires = this.GSservice.getGroupeScolaires();


    console.log("groupeScolaires",this.groupeScolaires)

    this.authServ.getgroupe().subscribe(res => {

      console.log("fct get groupe",res.id)
      this.nameGroupe="groupe Scolaires";
      this.selectGroup = null;
      this.ecoles=null;
      if(res.id){
        
        this.selectGroup=res.id
        console.log("res",res.id)
 

          this.http.get<GroupeScolaires[]>(this.authServ.getSubDomain()+"/ecoles_groupe/"+this.selectGroup).subscribe(res =>{
            this.groupeScol=res;
            this.nameGroupe=this.groupeScol.nomG;
            console.log("nom groupe *******",this.nameGroupe)
            console.log("nom base *******",this.selectGroup)

            this.eco.getEcolesSimple(this.selectGroup).subscribe(resp=>{
              console.log(resp)
              this.ecoles=resp;
              console.log("test",this.ecoles);
              // this.groupeScolaires = event.value;
            });

          })
      

      }
  
    })



  }

  Upload() {
    
  }
  
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};

  addFieldValue() {
      this.fieldArray.push(this.newAttribute)

      this.newAttribute = this.selectedOption;
  }

  deleteFieldValue(index) {
      this.fieldArray.splice(index, 1);
  }
  
}
