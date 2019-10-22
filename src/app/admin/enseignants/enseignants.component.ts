

import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, Type, NgModule} from '@angular/core';
import {EleveService} from "../../services/eleve.service";
import {EcoleService} from "../../services/ecole.service";
import {ClasseService} from "../../services/classe.service";
import {MatiereService} from "../../services/matiere.service";
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {CompteProService} from "../../services/comptePro.service";
import{HttpClient} from '@angular/common/http';
import {Classe} from "../../models/classes";
import {Matiere} from "../../models/matieres";
@Component({
  selector: 'app-enseignants',
  templateUrl: './enseignants.component.html',
  styleUrls: ['./enseignants.component.css']
})


export class EnseignantsComponent implements OnInit {
  dateDeconx: any='';
  connectedUser: any='';
  term: any='';
  idEcole: any = '';
  nomE: any = '';
  nom: any='';
  myMatiere: any='';
  prenom: any='';
  password: any='';
  password2: any='';
  tel1: any='';
  login: any='';
  pathAvatarSuper: any='';
  loader:any=true;
  successAdd: any='';
  public data:any=[];
  selectModel:any='';
  selectGroup:any='';
  choisirEcole:any='';
  ecoles:any=[];
  ListeEnseignants:any=[];
  myobject:any={};
  selectedFile: File= null;
  selectedEcole: string = '';
  list:any={};
  //list:any=[];

  listMatieres:any=[];
  listClasses:any=[];
  myselectecole:  any ='';
  tmpEnseignant:any='';
  Classe:any='';
  idMatiere:any='';
  index:any='';
  nomMatiere:any='';
  myClasses:any='';

  data2:any=[];
  data3:any={};
  classes:any=[];
  liste:any=[];
   matieres:any=[];


  public invoiceForm: FormGroup;
  constructor(private eco: EcoleService, private authServ: AuthService, private http: HttpClient, private enseignantService: CompteProService,private _fb: FormBuilder) {

    this.ListeEnseignants = [] ;


    this.connectedUser=authServ.getConnectedUser();
    let dateValue=Date.parse( this.connectedUser['derniereCnx']);
    this.dateDeconx=new Date(dateValue).toLocaleString();
    console.log("date deconx",this.connectedUser['derniereCnx']);
  }


  estNonVidee(chaine){
    if(chaine == "" || chaine==null){

      return false;
    }else{return true;}
  }

  selectEcole (event: any,idecole)
  {
    this.selectedEcole = event.target.value;
    this.idEcole=idecole;

    this.http.get<Matiere[]>(this.authServ.getSubDomain() + "/matieresSimple/" + this.authServ.getNomGroupe()+ "/"+ this.idEcole  ).subscribe(res => {
      this.data2 = res;

    });

  }

  selectMatiere (idMatiere)
  {
    // this.idMatiere = event.target.value;
    this.idMatiere=idMatiere;
    console.log("nomMatiere",this.idMatiere);

  }

  addNewRow() {

    this.listMatieres.push(this.myMatiere);
    //console.log("matieres",this.listMatieres);
    //console.log("liste matieres",this.listMatieres);
    this.idMatiere=this.myMatiere.id
    this.http.get<Classe[]>(this.authServ.getSubDomain() + "/matieresClasses/"+ this.idMatiere + "/"+this.authServ.getNomGroupe()  ).subscribe(res => {
      this.classes = res;
    });

    this.myMatiere=null

  }

  addNewRowClass() {
    this.listClasses.push(this.myClasses);

    //console.log("classes", this.listClasses);
    //console.log("matieres", this.listMatieres);
    var classes = [];

      this.list['idMatiere'] = this.listMatieres[0].id;

    //console.log(this.list['idMatiere'])
    this.listClasses.forEach(function (classe) {
      classes.push(classe);
    });


    this.list['classes']=classes;
    console.log(this.list['classes'])

    this.myClasses=null
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

  deleteRowClass(index: number) {
    let table= this.list
    this.list=[]
    for(let i=0;i<table.length;i++){
      if(i!=index){
        this.list.push(table[i])
      }
    }
  }
  //upload image Avatar
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
    this.http.post(this.authServ.getSubDomain()+"/upload",fd).subscribe(res =>{
      console.log("res",res);
      this.pathAvatarSuper=res;


    })
  }

  viewListEnseignant(selectModel){
    this.loader=true
    this.authServ.setIdSelectedEcole(selectModel);
    this.enseignantService.getListEnseignantsEcole().subscribe(res=>{
      console.log(res);
      this.data=res;
      this.loader=false
    })
  }
  isSelected(id){

    if (id === Number(this.authServ.getIdSelectedEcole()))
    {
      return true;
    }
    return false;
  }

  // ajout enseignnat
  addEnseignant(enseignant){
    console.log(enseignant);
    this.enseignantService.addEnseignant(enseignant);
    //this.router.navigate(['home']);
    setTimeout(()=>{
      this.successAdd="Nouveau enseignant «"+enseignant.nom+"» enregistré";
      this.ListeEnseignants= this.enseignantService.getListEnseignantslsEcole().subscribe(res=>{
        console.log(res);
        this.data=res;
        this.loader=false
      })
    },2000);
    setTimeout(()=>{
      this.successAdd=" ";
    },5000);
  }

  ngOnInit() {

    const $ = window["$"];
    $(document).ready(function() {
      // passage des Onglet page suivant ajout enseignant
      $('#clickInfo').on('click', function () {
        $('a[href="#droits"]').trigger('click');
      });


      // checked par défaut
      $('#check_accueil').prop('checked',true);
      $("#input_accueil").addClass("colorCheck");
      $('#check_messagerieInt').prop('checked',true);
      $("#input_messagerieInt").addClass("colorCheck");
      $('#check_CalendrierScol').prop('checked',true);
      $("#input_CalendrierScol").addClass("colorCheck");
      $('#check_docAdm').prop('checked',true);
      $("#input_docAdm").addClass("colorCheck");
      $('#check_docAdmRenvoy').prop('checked',true);
      $("#input_docAdmRenvoy").addClass("colorCheck");
      $('#check_emploi').prop('checked',true);
      $("#input_emploi").addClass("colorCheck");
      $('#check_emploi2').prop('checked',true);
      $("#input_emploi2").addClass("colorCheck");
      $('#check_photo').prop('checked',true);
      $("#input_photo").addClass("colorCheck");
      $('#check_affichage').prop('checked',true);
      $("#input_affichage").addClass("colorCheck");
      $('#check_cours').prop('checked',true);
      $("#input_cours").addClass("colorCheck");
      $('#check_appelEnSalle').prop('checked',true);
      $("#input_appelEnSalle").addClass("colorCheck");
      $('#check_traveauxARendre').prop('checked',true);
      $("#input_traveauxARendre").addClass("colorCheck");
      $('#check_suivieJustif').prop('checked',true);
      $("#input_suivieJustif").addClass("colorCheck");

      $('#check_sanctions').prop('checked',true);
      $("#input_sanctions").addClass("colorCheck");
      $('#check_notes').prop('checked',true);
      $("#input_notes").addClass("colorCheck");
      $('#check_bilannotes').prop('checked',true);
      $("#input_bilannotes").addClass("colorCheck");
      $('#check_conseilClasse').prop('checked',true);
      $("#input_conseilClasse").addClass("colorCheck");
      $('#check_suivieEleves').prop('checked',true);
      $("#input_suivieEleves").addClass("colorCheck");
      $('#check_bulletinsEleves').prop('checked',true);
      $("#input_bulletinsEleves").addClass("colorCheck");
      $('#check_bulletinsclasses').prop('checked',true);
      $("#input_bulletinsclasses").addClass("colorCheck");
      $('#check_dictionnaire').prop('checked',true);
      $("#input_dictionnaire").addClass("colorCheck");
      $('#check_wiki').prop('checked',true);
      $("#input_wiki").addClass("colorCheck");
      $('#check_drive').prop('checked',true);
      $("#input_drive").addClass("colorCheck");
      $('#check_office').prop('checked',true);
      $("#input_office").addClass("colorCheck");

//////////////////////////////////////colorer les inputs dans l'onglet Donnee Serveur(Ajout)/////////////////////////////////
      $('#check_accueil').on('change', function () {

        if ($('#check_accueil').is(':checked')) {
          $("#input_accueil").addClass("colorCheck");
        } else {
          $("#input_accueil").removeClass("colorCheck");

        }
      });
      $('#check_messagerieInt').on('change', function () {

        if ($('#check_messagerieInt').is(':checked')) {
          $("#input_messagerieInt").addClass("colorCheck");
        } else {
          $("#input_messagerieInt").removeClass("colorCheck");

        }
      });
      $('#check_messagerieExt').on('change', function () {

        if ($('#check_messagerieExt').is(':checked')) {
          $("#input_messagerieExt").addClass("colorCheck");
        } else {
          $("#input_messagerieExt").removeClass("colorCheck");

        }
      });
      $('#check_rdv').on('change', function () {

        if ($('#check_rdv').is(':checked')) {
          $("#input_rdv").addClass("colorCheck");
        } else {
          $("#input_rdv").removeClass("colorCheck");

        }
      });
      $('#check_photo').on('change', function () {

        if ($('#check_photo').is(':checked')) {
          $("#input_photo").addClass("colorCheck");
        } else {
          $("#input_photo").removeClass("colorCheck");

        }
      });
      $('#check_docAdm').on('change', function () {

        if ($('#check_docAdm').is(':checked')) {
          $("#input_docAdm").addClass("colorCheck");
        } else {
          $("#input_docAdm").removeClass("colorCheck");

        }
      });
      $('#check_docAdmRenvoy').on('change', function () {

        if ($('#check_docAdmRenvoy').is(':checked')) {
          $("#input_docAdmRenvoy").addClass("colorCheck");
        } else {
          $("#input_docAdmRenvoy").removeClass("colorCheck");

        }
      });
      $('#check_docAdmRenvoyublie').on('change', function () {

        if ($('#check_docAdmRenvoyublie').is(':checked')) {
          $("#input_docAdmRenvoyublie").addClass("colorCheck");
        } else {
          $("#input_docAdmRenvoyublie").removeClass("colorCheck");

        }
      });
      $('#check_affichage').on('change', function () {

        if ($('#check_affichage').is(':checked')) {
          $("#input_affichage").addClass("colorCheck");
        } else {
          $("#input_affichage").removeClass("colorCheck");

        }
      });
      $('#check_emploi').on('change', function () {

        if ($('#check_emploi').is(':checked')) {
          $("#input_emploi").addClass("colorCheck");
        } else {
          $("#input_emploi").removeClass("colorCheck");

        }
      });

      $('#check_emploi2').on('change', function () {

        if ($('#check_emploi2').is(':checked')) {
          $("#input_emploi2").addClass("colorCheck");
        } else {
          $("#input_emploi2").removeClass("colorCheck");

        }
      });
      $('#check_cours').on('change', function () {

        if ($('#check_cours').is(':checked')) {
          $("#input_cours").addClass("colorCheck");
        } else {
          $("#input_cours").removeClass("colorCheck");

        }
      });

      $('#check_CalendrierScol').on('change', function () {

        if ($('#check_CalendrierScol').is(':checked')) {
          $("#input_CalendrierScol").addClass("colorCheck");
        } else {
          $("#input_CalendrierScol").removeClass("colorCheck");

        }
      });


      $('#check_loc').on('change', function () {

        if ($('#check_loc').is(':checked')) {
          $("#input_loc").addClass("colorCheck");
        } else {
          $("#input_loc").removeClass("colorCheck");

        }
      });


      $('#check_appelEnSalle').on('change', function () {

        if ($('#check_appelEnSalle').is(':checked')) {
          $("#input_appelEnSalle").addClass("colorCheck");
        } else {
          $("#input_appelEnSalle").removeClass("colorCheck");

        }
      });


      $('#check_traveauxARendre').on('change', function () {

        if ($('#check_traveauxARendre').is(':checked')) {
          $("#input_traveauxARendre").addClass("colorCheck");
        } else {
          $("#input_traveauxARendre").removeClass("colorCheck");

        }
      });


      $('#check_suivieJustif').on('change', function () {

        if ($('#check_suivieJustif').is(':checked')) {
          $("#input_suivieJustif").addClass("colorCheck");
        } else {
          $("#input_suivieJustif").removeClass("colorCheck");

        }
      });


      $('#check_saisieJustif').on('change', function () {

        if ($('#check_saisieJustif').is(':checked')) {
          $("#input_saisieJustif").addClass("colorCheck");
        } else {
          $("#input_saisieJustif").removeClass("colorCheck");

        }
      });



      $('#check_bilanAbsence').on('change', function () {

        if ($('#check_bilanAbsence').is(':checked')) {
          $("#input_bilanAbsence").addClass("colorCheck");
        } else {
          $("#input_bilanAbsence").removeClass("colorCheck");

        }
      });


      $('#check_sanctions').on('change', function () {

        if ($('#check_sanctions').is(':checked')) {
          $("#input_sanctions").addClass("colorCheck");
        } else {
          $("#input_sanctions").removeClass("colorCheck");

        }
      });

      $('#check_notes').on('change', function () {

        if ($('#check_notes').is(':checked')) {
          $("#input_notes").addClass("colorCheck");
        } else {
          $("#input_notes").removeClass("colorCheck");

        }
      });
      $('#check_bilannotes').on('change', function () {

        if ($('#check_bilannotes').is(':checked')) {
          $("#input_bilannotes").addClass("colorCheck");
        } else {
          $("#input_bilannotes").removeClass("colorCheck");

        }
      });

      $('#check_conseilClasse').on('change', function () {

        if ($('#check_conseilClasse').is(':checked')) {
          $("#input_conseilClasse").addClass("colorCheck");
        } else {
          $("#input_conseilClasse").removeClass("colorCheck");

        }
      });


      $('#check_suivieEleves').on('change', function () {

        if ($('#check_suivieEleves').is(':checked')) {
          $("#input_suivieEleves").addClass("colorCheck");
        } else {
          $("#input_suivieEleves").removeClass("colorCheck");

        }
      });
      $('#check_bulletinsEleves').on('change', function () {

        if ($('#check_bulletinsEleves').is(':checked')) {
          $("#input_bulletinsEleves").addClass("colorCheck");
        } else {
          $("#input_bulletinsEleves").removeClass("colorCheck");

        }
      });
      $('#check_bulletinsclasses').on('change', function () {

        if ($('#check_bulletinsclasses').is(':checked')) {
          $("#input_bulletinsclasses").addClass("colorCheck");
        } else {
          $("#input_bulletinsclasses").removeClass("colorCheck");

        }
      });
      $('#check_infirmerie').on('change', function () {

        if ($('#check_infirmerie').is(':checked')) {
          $("#input_infirmerie").addClass("colorCheck");
        } else {
          $("#input_infirmerie").removeClass("colorCheck");

        }
      });
      $('#check_dictionnaire').on('change', function () {

        if ($('#check_dictionnaire').is(':checked')) {
          $("#input_dictionnaire").addClass("colorCheck");
        } else {
          $("#input_dictionnaire").removeClass("colorCheck");

        }
      });
      $('#check_wiki').on('change', function () {

        if ($('#check_wiki').is(':checked')) {
          $("#input_wiki").addClass("colorCheck");
        } else {
          $("#input_wiki").removeClass("colorCheck");

        }
      });
      $('#check_drive').on('change', function () {

        if ($('#check_drive').is(':checked')) {
          $("#input_drive").addClass("colorCheck");
        } else {
          $("#input_drive").removeClass("colorCheck");

        }
      });
      $('#check_office').on('change', function () {

        if ($('#check_office').is(':checked')) {
          $("#input_office").addClass("colorCheck");
        } else {
          $("#input_office").removeClass("colorCheck");

        }
      });
    });


    this.authServ.getgroupe().subscribe(res => {

      this.selectGroup=res.id
      console.log(" console.log(this.selectGroup);",this.selectGroup);
      this.data=[]
      if(res.id || this.selectModel){
        if(res.id){

          this.selectModel=this.authServ.getIdSelectedEcole()
          if(this.selectModel){
            this.loader=true
            this.enseignantService.getListEnseignantslsEcole().subscribe(res=>{
              console.log(res);
              this.data=res
              this.loader=false
            })
          }

          this.loader=true
          this.eco.getEcoles(res.id).subscribe(res=>{
            console.log(res);
            this.loader=false
            this.ecoles = res
          })
        }
        else{
          let nom = this.authServ.getNomGroupe()
          this.loader=true
          this.eco.getEcoles(nom).subscribe(res=>{
            console.log(res);
            this.ecoles = res
            this.loader=false
          })


        }
      }



    })

  }

  Effacer_Recherche(){
    this.term='';
  }

  modalSupp(tmpEnseignant){
    this.tmpEnseignant=tmpEnseignant;
  }
  DeleteEnseignant(id) {

    console.log("enseignant id ", id)
    this.enseignantService.deleteEnseignant(id).subscribe(res => {
      this.enseignantService.getListEnseignantslsEcole().subscribe(res=>{
        this.data=res
        console.log(this.data)
      })
    });
  }

  /* exportationExcel(){
   let tab =[]
   for (let index = 0; index < this.data.length; index++) {
   const element = this.data[index];
   tab.push({
   'Nom':element.nom,
   'Prenom':element.prenom,
   'Civilité':element.civilite,
   'Ville':element.ville,
   'Email':element.email,
   'Telephone':element.tel1,
   'Fonction':element.fonction,
   })
   if(index==this.data.length-1){
   this.exel.downloadExcel(tab,'SuperAdmins_'+this.authServ.getNomGroupe()+'_'+this.monecole)
   }
   }
   }
   //imprimer pdf

   generationPDF() {

   this.http.get<[Personnels]>(this.authServ.getSubDomain()+"/superadmin/"+this.authServ.getNomGroupe()+"/"+this.authServ.getIdSelectedEcole()).subscribe(perso =>
   {
   console.log(perso);
   var columns = [
   {title: "Nom ", dataKey: "nom"},
   {title: "Prénom", dataKey: "prenom"},
   {title: "Civilité", dataKey: "civilite"},
   {title: "Fonction ", dataKey: "fonction"},
   {title: "Email", dataKey: "email"},
   {title: "Ville", dataKey: "ville"},
   {title: "Telephone ", dataKey: "tel1"},
   ];

   var doc = new jsPDF('l', 'mm', [297, 210]);
   doc.autoTable(columns, perso, {
   theme: 'grid',
   styles: {
   overflow: 'linebreak',
   fontSize: 7},

   margin: {top: 22},
   addPageContent: function(data) {
   doc.text("Liste des Superadmins",128,15);
   }
   });

   doc.autoPrint()
   doc.save("SuperAdmins_"+this.monecole+" "+this.authServ.getNomGroupe()+".pdf");
   //doc.output('dataurlnewwindow');
   doc.output('dataurlnewwindow','ecoles.pdf');
   window.open(doc.output('bloburl'), '_blank');
   });

   }*/





}
