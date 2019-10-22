import { Component, OnInit } from "@angular/core";
import { GroupeScolaireService } from "../services/groupe-scolaire.service";
import { AuthService } from "../services/auth.service";
import { HttpClient } from "@angular/common/http";
import { Ecoles } from "../models/ecoles";
import { Router } from "@angular/router";
// var writeFile = require('write-file')
@Component({
  selector: "app-connexion-groupe",
  templateUrl: "./connexion-groupe.component.html",
  styleUrls: ["./connexion-groupe.component.css"]
})
export class ConnexionGroupeComponent implements OnInit {
  showlogin: any = false;
  groupeInfo: any = {};
  monEcole: any = {};
  public emailMessageErreur: any;
  public MessageErreur: any;
  public groupeScolaire: any;
  public ImagePageConnexionParDefaut: any;
  ready: any = false;
  public isHidden: any;
  user: any = {};
  public motDirecteur: string;
  public imageDirecteur: string;
  retour: any = false;
  constructor(
    private router: Router,
    private groupeService: GroupeScolaireService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  //---------------------------------------------------------------------------------------------------------------------------------

  ngOnInit() {
    let nomDomaine = document.location.hostname;
    let nomSubDomain = nomDomaine.split(".");
    if (nomSubDomain[0] != "admin") {
      this.http.get(this.authService.getSubDomain() + "/authguard").subscribe(
        dataa => {
          console.log(dataa);
          if (dataa["message"] != "ko") {
            this.router.navigate(["directeurplateform"]);
          } else {
            this.getgroupeInfo(nomSubDomain[0]);
            this.getgroupebyhostname(nomSubDomain[0]);
          }
        },
        error => {
          this.getgroupeInfo(nomSubDomain[0]);
          this.getgroupebyhostname(nomSubDomain[0]);
        }
      );
    } else {
      this.router.navigate(["admin"]);
    }
  }
  getgroupebyhostname(domaine) {
    this.authService.getGroupeScolairebydom(domaine).subscribe(res => {
      console.log(res);
      if (res.nomG) {
        this.authService.setNomGroupe(res.nomG);
        this.authService.setgroupe(res.nomG);
      }
    });
  }
  getgroupeInfo(subdomain) {
    this.authService.getEcolesByGroupeScolaire(subdomain).subscribe(res => {
      console.log(res);

      if (res[0]) {
        this.groupeInfo = res[0];
        this.ready = true;
      }
    });
  }

  //Validation emails
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  loginUser() {
    this.authService.destroyNomGroupe();
    this.authService.destroyMyschoolInfo();
    this.MessageErreur = "";
    var email = this.user.email;
    var password = this.user.password;
    if (this.validateEmail(email) == true) {
      this.emailMessageErreur = "";
      this.authService.loginUserGroupe(email, password).subscribe(res => {
        if (this.authService.getUserLoggedIndir()) {
          this.authService.setMyschoolInfo(this.monEcole);
          this.authService.setIdSelectedEcole(this.monEcole.id);
          console.log(this.authService.getlogoEcole());

          let colors = {
            $col_S002: this.monEcole.couleurExterne,
            $col_S003: this.monEcole.couleurBarreTache
          };
          // fs('../../assets/scss/directeur/colorwael.scss',colors, function(err) {
          //      console.log(err);
          // });
          this.router.navigate(["directeurplateform"]);
        } else {
          this.MessageErreur = "email ou mot de passe incorrect";
        }
      });
    } else {
      this.MessageErreur = "email non valide";
    }
  }
  schoolselected(ecole) {
    this.MessageErreur = "";
    this.showlogin = true;
    this.monEcole = ecole;
    this.authService.setIdSelectedEcole(ecole.id);
    this.retour = true;
  }
}
