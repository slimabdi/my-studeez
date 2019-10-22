import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Ecoles} from "../models/ecoles";
import {ReponseUrl} from "../models/reponse-url";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";
import {HoraireEcoles} from "../models/horaire-ecoles";
import { DonneeServeurs} from "../models/donneeServeurs";
import {GroupeScolaires} from "../models/groupe-scolaires";

@Injectable()
export class EcoleService {
  private nomDomaine: any;
  private nomSubDomain: any;

  constructor(private http: HttpClient, private authServ : AuthService) {
    this.nomDomaine = document.location.hostname;
    this.nomSubDomain = this.nomDomaine.split(".");
  }

  getEcoles(nomGroupe){
    return this.http.get<Ecoles[]>(this.authServ.getSubDomain()+"/ecoles_Groupe_Scolaire_Order/"+nomGroupe);
  }
 getEcolesSimple(nomGroupe){
    return this.http.get<Ecoles[]>(this.authServ.getSubDomain()+"/ecoles_Simple/"+nomGroupe);
  }


  getEcolesExcel(nomGroupe){
    return this.http.get<Ecoles[]>(this.authServ.getSubDomain()+"/ecoles_Excel/"+nomGroupe);
  }

  getNombreEcole(idCU){
    return this.http.get<Ecoles[]>(this.authServ.getSubDomain()+"/ConterEcoles/"+this.authServ.getNomGroupe()+"/"+idCU);
  }

  AddEcole(ecole : Ecoles) {
    this.http.post(this.authServ.getSubDomain()+"/ecoles",{ecole: ecole, nomGroupe:this.authServ.getNomGroupe()} )
      .subscribe((resp: any) => {
        console.log(resp);
      }, (errorResp) => {
      });
  }

  DeleteEcole(id): Observable<ReponseUrl> {
    console.log("id==="+id);
    return this.http.get<ReponseUrl>(this.authServ.getSubDomain()+"/ecoles/"+this.authServ.getNomGroupe()+"/"+id);
  }

  editEcole(ecole){
    this.http.put(this.authServ.getSubDomain()+"/ecoles/",{ecole: ecole, nomGroupe:this.authServ.getNomGroupe()} )
      .subscribe((resp: any) => {
        console.log(resp);
      }, (errorResp) => {
      });
  }




  /*getEcolePrecis(idecole,nomg){
    return this.http.get<Ecoles[]>(this.authServ.getSubDomain()+"/ecolePrecis/"+idecole+"/"+nomg);

  }*/

  getEcolePrecis(idecole,nomg): Observable<any> {
    return Observable.create(observer => {
      this.http
        .get<Ecoles[]>(
          this.authServ.getSubDomain() +
          "/ecolePrecis/" +
          idecole +
          "/" +
          nomg
        )
        .subscribe(
          (resp: any) => {
            observer.next(resp);
          },
          errorResp => {
            observer.next([]);
          }
        );
    });
  }


  updateInfoGeneral(ecole :Ecoles): Observable<any> {

    console.log(ecole.nomE)
    return Observable.create(observer => {
      this.http.put(this.authServ.getSubDomain() + "/ecolesUpInfoGene", {ecole
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
  updateDonneeServeur(ecole :Ecoles): Observable<any> {

    console.log(ecole.nomE)
    return Observable.create(observer => {
      this.http.put(this.authServ.getSubDomain() + "/ecolesUpDS", {ecole
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
  }  updatePresentation(ecole :Ecoles): Observable<any> {

    return Observable.create(observer => {
      this.http.put(this.authServ.getSubDomain() + "/ecolesUpPresentation", {ecole
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

}
