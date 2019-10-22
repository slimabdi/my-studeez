/**
 * Created by S1-DEV-ETC on 20/03/2018.
 */
import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { Personnels } from "../models/Personnels";
import { Classe } from "../models/classes";
import { HttpClientModule } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { EcolesComponent } from "../admin/ecoles/ecoles.component";
import { error, log } from "util";
import { ReponseUrl } from "../models/reponse-url";
import { environment } from "../../environments/environment";
import { Ecoles } from "../models/ecoles";
import { AuthService } from "./auth.service";
import { Enseignant } from "../models/enseignants";
import { Enseignants } from "../modelsDirecteurPlateform/Enseignants.model.";
@Injectable()
export class CompteProService {
  private nomDomaine: any;
  private nomSubDomain: any;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.nomDomaine = document.location.hostname;
    this.nomSubDomain = this.nomDomaine.split(".");
  }

  //services personnels

  ajouterPersonnel(personnel: Personnels): Observable<any> {
    console.log("personnel à modifier" + personnel.affichClasses);
    console.log("personnel à modifier" + personnel.avatar);

    return this.http.post(this.authService.getSubDomain() + "/personnels", {
      personnel: personnel,
      nomGroupe: this.authService.getNomGroupe()
    });
  }

  updatePersonnel(personnel: Personnels) {
    console.log("personnel à modifier" + personnel.affichClasses);
    console.log("personnel à modifier" + personnel.nom);
    return this.http.put(this.authService.getSubDomain() + "/personnels", {
      personnel: personnel,
      nomGroupe: this.authService.getNomGroupe()
    });
  }

  getListPersonnelsEcole(): Observable<any> {
    return this.http.get<Personnels[]>(
      this.authService.getSubDomain() +
        "/personnels/" +
        this.authService.getNomGroupe() +
        "/" +
        this.authService.getIdSelectedEcole()
    );
  }

  deletePersonnel(id): Observable<ReponseUrl> {
    console.log("Service id ===" + id);
    return this.http.get<ReponseUrl>(
      this.authService.getSubDomain() +
        "/personnel/" +
        id +
        "/" +
        this.authService.getNomGroupe() +
        "/" +
        this.authService.getIdSelectedEcole()
    );
  }

  getClasseParPersonnel(id): Observable<any> {
    return this.http.get<Personnels[]>(
      this.authService.getSubDomain() +
        "/personnelsclasses/" +
        id +
        "/" +
        this.authService.getNomGroupe()
    );
  }

  //services enseignants
  getListEnseignantslsEcole(): Observable<any> {
    console.log("select enseignants", this.authService.getIdSelectedEcole());

    return this.http.get<Personnels[]>(
      this.authService.getSubDomain() +
        "/enseignants/" +
        this.authService.getNomGroupe() +
        "/" +
        this.authService.getIdSelectedEcole()
    );
  }

  deleteEnseignant(id): Observable<ReponseUrl> {
    console.log("Service id ===" + id);
    return this.http.get<ReponseUrl>(
      this.authService.getSubDomain() +
        "/enseignant/" +
        id +
        "/" +
        this.authService.getNomGroupe()
    );
  }

  addEnseignant(enseignant: Enseignant) {
    console.log("enseignant service", enseignant);

    this.http
      .post(this.authService.getSubDomain() + "/enseignants", {
        enseignant: enseignant,
        nomGroupe: this.authService.getNomGroupe()
      })
      .subscribe(
        (resp: any) => {
          console.log(resp);
        },
        errorResp => {}
      );
  }

  getClasseEnseignant(id) {
    return this.http.get<Enseignant[]>(
      this.authService.getSubDomain() +
        "/enseignantsclasses/" +
        id +
        "/" +
        this.authService.getNomGroupe()
    );
  }
  getMatieresEnseignant(id) {
    return this.http.get<Enseignant[]>(
      this.authService.getSubDomain() +
        "/enseignantsmatieres/" +
        id +
        "/" +
        this.authService.getNomGroupe()
    );
  }

  updateEnseignant(enseignant: Enseignant) {
    console.log("personnel à modifier" + enseignant);
    return this.http.put(this.authService.getSubDomain() + "/enseignants", {
      enseignant: enseignant,
      nomGroupe: this.authService.getNomGroupe()
    });
  }
  /***********************************  Directeurs *****************************************/
  getListDirecteursEcole(): Observable<any> {
    console.log("select ecole", this.authService.getIdSelectedEcole());
    return Observable.create(observer => {
      this.http
        .get<Personnels[]>(
          this.authService.getSubDomain() +
            "/directeurs/" +
            this.authService.getNomGroupe() +
            "/" +
            this.authService.getIdSelectedEcole()
        )
        .subscribe(
          (resp: any) => {
            console.log(resp);
            observer.next(resp);
          },
          errorResp => {
            console.log(errorResp);
            observer.next([]);
          }
        );
    });
  }

  ajouterDirecteur(personnel: Personnels): Observable<any> {
    console.log("personnel service", personnel);
    return Observable.create(observer => {
      this.http
        .post(this.authService.getSubDomain() + "/directeurs", {
          personnel: personnel,
          nomGroupe: this.authService.getNomGroupe()
        })
        .subscribe(
          (resp: any) => {
            console.log(resp);

            observer.next(resp);
          },
          errorResp => {
            console.log(errorResp);

            observer.next({});
          }
        );
    });
  }
  modifierDirecteur(personnel: Personnels): Observable<any> {
    console.log("update service");
    return Observable.create(observer => {
      this.http
        .put(this.authService.getSubDomain() + "/directeurs", {
          personnel: personnel,
          nomGroupe: this.authService.getNomGroupe()
        })
        .subscribe(
          (resp: any) => {
            observer.next(resp);
          },
          errorResp => {
            observer.next({});
          }
        );
    });
  }

  /***********************************  SuperAdmin *****************************************/
  getListSuperAdminEcole(): Observable<any> {
    console.log("select ecole", this.authService.getIdSelectedEcole());

    return this.http.get<Personnels[]>(
      this.authService.getSubDomain() +
        "/superadmin/" +
        this.authService.getNomGroupe() +
        "/" +
        this.authService.getIdSelectedEcole()
    );
  }

  ajouterSuperAdmin(personnel: Personnels) {
    return Observable.create(observer => {
      this.http
        .post(this.authService.getSubDomain() + "/superadmin", {
          personnel: personnel,
          nomGroupe: this.authService.getNomGroupe()
        })
        .subscribe(
          (resp: any) => {
            observer.next(resp);
          },
          errorResp => {
            observer.next({});
          }
        );
    });
  }

  updateSuperAdmin(personnel: Personnels) {
    return Observable.create(observer => {
      this.http
        .put(this.authService.getSubDomain() + "/superadmin", {
          personnel: personnel,
          nomGroupe: this.authService.getNomGroupe()
        })
        .subscribe(
          (resp: any) => {
            observer.next(resp);
          },
          errorResp => {
            observer.next({});
          }
        );
    });
  }

  getEcolesSuper(id) {
    return this.http.get<Ecoles[]>(
      this.authService.getSubDomain() +
        "/superadminEcole/" +
        this.authService.getNomGroupe() +
        "/" +
        id
    );
  }
  /*
   getPersonnelExcel(nomGroupe){
   return this.http.get<Personnels[]>(this.authService.getSubDomain()+"/personnel_Excel/"+nomGroupe);
   }*/
  getListEnseignantsEcole(): Observable<any> {
    console.log("select enseignants", this.authService.getIdSelectedEcole());

    return this.http.get<Personnels[]>(
      this.authService.getSubDomain() +
        "/enseignants/" +
        this.authService.getNomGroupe() +
        "/" +
        this.authService.getIdSelectedEcole()
    );
  }
}
