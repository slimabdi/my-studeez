import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { User } from "../../models/user";
import { AuthService } from "../../services/auth.service";
import { GroupeScolaireService } from "../../services/groupe-scolaire.service";
import { Router } from "@angular/router";

import { HttpClient } from "@angular/common/http";

import * as $ from "jquery";
import { Globals } from "../../models/globals";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit, AfterViewInit {
  user: any = "";
  nom: any = "";
  prenom: any = "";
  avatar: any = "";
  login: any = "";
  OldPwd: any = "";
  NewPwd: any = "";
  ConfirmPwd: any = "";

  groupeScolaires: any = "";
  nomG: any = "";
  nomGroupe: any = "";
  id: any = "";

  presentation: any = "";
  titrePresentation: any = "";
  couleurBarreTache: any = "";
  couleurExterne: any = "";

  imgPageCnx: any = "";
  logoPageCnx: any = "";
  logoBarreTache: any = "";
  photoPresentation: any = "";

  selectedFile: File = null;
  pathImagePageCx: any = "";
  pathLogoCx: any = "";
  pathLogoBtache: any = "";

  pathPhotoPresentation: any = "";
  tmp: any = "";
  tmp1: any = "";
  tmp2: any = "";
  tmp3: any = "";
  colorBT: any = "#FFF";
  idPers:any ="";
  color: any = "#FFF";
  connectedUser: any = "";
  groupename: any = null;
  public data: any = [];


 @ViewChild("hideModelUpdateP") hideModelUpdateP: ElementRef;

  constructor(
    private GSservice: GroupeScolaireService,
    private authServ: AuthService,
    private router: Router,
    private http: HttpClient,
    private globals: Globals
  ) {

    this.http.get(this.authServ.getSubDomain()+"/personalisation").subscribe(res =>{
      console.log("persoooooo",res);
     this.data=res;

      var indexIPcx = this.data.imgPageCnx.lastIndexOf("/");
      var indexLPx = this.data.logoPageCnx.lastIndexOf("/");
      var indexLBt = this.data.logoBarreTache.lastIndexOf("/");
      var indexLPP = this.data.photoPresentation.lastIndexOf("/");


      this.tmp = this.data.imgPageCnx.substr(0, indexIPcx);
      this.tmp1 = this.data.logoPageCnx.substr(0, indexLPx);
      this.tmp2 = this.data.logoBarreTache.substr(0, indexLBt);
      this.tmp3 = this.data.photoPresentation.substr(0, indexLPP);

      this.idPers=this.data.id;
      this.pathImagePageCx=this.data.imgPageCnx.substr(indexIPcx + 1);
      this.pathLogoCx=this.data.logoPageCnx.substr(indexLPx+ 1);
      this.pathPhotoPresentation=this.data.photoPresentation.substr(indexLPP+ 1);
      this.pathLogoBtache=this.data.logoBarreTache.substr(indexLBt+ 1);

      this.titrePresentation=this.data.titrePresentation;
      this.presentation=this.data.presentation;
      this.color=this.data.couleurExterne;
      this.colorBT=this.data.couleurBarreTache;

    })
    this.groupename = this.authServ.getNomGroupe();
    if (this.groupename) {
      this.authServ.setgroupe(this.groupename);
      this.authServ.setNomGroupe(this.groupename);
      this.authServ.setIdSelectedEcole(null);
    }
    this.groupeScolaires = GSservice.getGroupeScolaires();
    this.connectedUser = authServ.getConnectedUser();

    if (this.connectedUser) {

      this.id = this.connectedUser["id"];
      this.nom = this.connectedUser["nom"];
      this.prenom = this.connectedUser["prenom"];
      this.avatar = this.connectedUser["avatar"];
      this.login = this.connectedUser["login"];
      this.OldPwd = this.connectedUser["OldPwd"];
    }
  }

  ModalAfficheUser(id,nom,prenom,avatar,login){

    this.id=id;
    this.nom=nom;
    this.prenom=prenom;
    this.avatar=avatar;
    this.login=login;


  }

  updateUser(user)
  {

    console.log("update",user)
    this.authServ.updateUser(user);





  }
  ///////personnalisation groupe/////
  editPersonnalisation(perso) {


    this.http.put(this.authServ.getSubDomain()+"/personalisation",
      {
        imgPageCnx:perso.imgPageCnx,
        logoPageCnx:perso.logoPageCnx,
        logoBarreTache:perso.logoBarreTache,
       couleurExterne:this.color,
       couleurBarreTache:this.colorBT,
        photoPresentation:perso.photoPresentation,
        titrePresentation:perso.titrePresentation,
        presentation:perso.presentation,

      }
    ).subscribe((resp: any) => {
      console.log(resp);
      this.hideModelUpdateP.nativeElement.click();
    }, (errorResp) => {
      console.log(errorResp);
    });

  }

  onFileSelected(event){
    this.tmp='tmp';

    this.selectedFile=<File>event.target.files[0];
    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post(this.authServ.getSubDomain()+"/upload",fd).subscribe(res =>{
      console.log("res",res);
      this.pathImagePageCx=res;
    })
  }
  onLogoPageConxSelected(event){
    this.tmp1='tmp';


    this.selectedFile=<File>event.target.files[0];
    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post(this.authServ.getSubDomain()+"/upload",fd).subscribe(res =>{//appeler service d'upload l'image et retourner le nom comme resultat
      console.log("res",res);
      this.pathLogoCx=res;
    })
  }
  onPhotoEtablissementSelected(event){
this.tmp3='tmp';
    this.selectedFile=<File>event.target.files[0];
    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post(this.authServ.getSubDomain()+"/upload",fd).subscribe(res =>{//appeler service d'upload l'image et retourner le nom comme resultat
      console.log("res",res);
      this.pathPhotoPresentation=res;
    })
  }
  onLogoBtacheSelected(event){
    this.tmp2='tmp';

    this.selectedFile=<File>event.target.files[0];
    const fd=new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post(this.authServ.getSubDomain()+"/upload",fd).subscribe(res =>{
      console.log("res",res);
      // (<HTMLInputElement>document.getElementById("path").value) = res.name;
      this. pathLogoBtache=res;
    })
  }
  estNonVidee(chaine) {
    if (chaine == "" || chaine==null) {
      //console.log("La chaîne est vide");
      return false;
    } else {
      return true;
    }
  }
////////////////////////////////////
  onChange(nom) {
    this.authServ.setgroupe(nom);
    this.authServ.setNomGroupe(nom);
    this.authServ.setIdSelectedEcole(null);
  }

  isSelected(nom) {
    if (nom === this.authServ.getNomGroupe()) {
      return true;
    }
    return false;
  }

  //////log out /////////////////////////////
  logoutClicked(event: Event) {
    event.preventDefault(); // Prevents browser following the link
    console.log("click");
    this.authServ.logoutUser();
    //this.authServ.logoutUser();
  }

  ngOnInit() {
    this.authServ.getupdategroups().subscribe(res => {
      console.log(res);

      if (res.updat) {
        this.groupeScolaires = this.GSservice.getGroupeScolaires();
        this.groupename=null
      }
    });

    const $ = window["$"];

    $(function () {
      $('[data-toggle="tooltip"]').tooltip({
        animated: 'fade',
        placement: 'right',
        html: true
      });

    });
    $(function() {
      $("#color-externe-component").colorpicker();
      $("#color-barre-tache-component").colorpicker();

      $("#color-externe-component-m").colorpicker();
      $("#color-barre-tache-component-m").colorpicker();
    });
  }

  ngAfterViewInit() {
    const $ = window["$"];
    /*$(function () {alert("yes");});*/
    setTimeout(function() {
      var x, i, j, selElmnt, a, b, c;
      /*look for any elements with the class "custom-select":*/
      x = document.getElementsByClassName("custom-select");
      for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        console.log(a);
        x[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < selElmnt.length; j++) {
          /*for each option in the original select element,
           create a new DIV that will act as an option item:*/
          c = document.createElement("DIV");
          c.innerHTML = selElmnt.options[j].innerHTML;
          c.addEventListener("click", function(e) {
            /*when an item is clicked, update the original select box,
             and the selected item:*/
            var i, s, h;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            h = this.parentNode.previousSibling;
            for (i = 0; i < s.length; i++) {
              if (s.options[i].innerHTML == this.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = this.innerHTML;
                break;
              }
            }
            h.click();
          });
          b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function(e) {
          /*when the select box is clicked, close any other select boxes,
           and open/close the current select box:*/
          e.stopPropagation();
          closeAllSelect(this);
          this.nextSibling.classList.toggle("select-hide");
          this.classList.toggle("select-arrow-active");
        });
      }
    }, 2000);

    function closeAllSelect(elmnt) {
      /*a function that will close all select boxes in the document,
       except the current select box:*/
      var x,
        y,
        i,
        arrNo = [];
      x = document.getElementsByClassName("select-items");
      y = document.getElementsByClassName("select-selected");
      for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i);
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }
      for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add("select-hide");
        }
      }
    }
    /*if the user clicks anywhere outside the select box,
     then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);
  }
}
