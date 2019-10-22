import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Matiere} from "../models/matieres";
import {ReponseUrl} from "../models/reponse-url";
import {AuthService} from "./auth.service";

@Injectable()
export class MatiereService {

  constructor(private http: HttpClient, private authSevice : AuthService) { }


  // afficher liste des matieres optionnelles
  getMatieres(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.authSevice.getSubDomain()+"/matiereopts/"+this.authSevice.getNomGroupe());
  }


// afficher tous les matières
  getAllMatieres(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.authSevice.getSubDomain()+"/matieres/"+this.authSevice.getNomGroupe());
  }

 //Ajouter une matière
 /*AddMatiere(matiere :Matiere)
  {

    return this.http.post(this.authSevice.getSubDomain()+'/matieres', {matiere: matiere , nomGroupe: this.authSevice.getNomGroupe()})
    .subscribe((resp: any) => {
      console.log(resp);
    }, (errorResp) => {
    });


  }*/
AddMatiere(matiere :Matiere): Observable<any> {
    return Observable.create(observer => {
      this.http.post(this.authSevice.getSubDomain() + "/matieres", {
        matiere: matiere,
        nomGroupe: this.authSevice.getNomGroupe()
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


  //supprimer matière
  /*deleteMatiere(id): Observable<ReponseUrl> {
    return this.http.get<ReponseUrl>(this.authSevice.getSubDomain()+"/matieres/"+id+"/"+this.authSevice.getNomGroupe());
  }*/

  deleteMatiere(id): Observable<ReponseUrl> {
    return this.http.get<ReponseUrl>(
      this.authSevice.getSubDomain() +
      "/matieres/" +
      id +
      "/" +
      this.authSevice.getNomGroupe()
    );
  }




  //modifier matiére
  /*updateMatiere(matiere :Matiere){
    console.log("matiere service ", matiere)

    this.http.put(this.authSevice.getSubDomain()+"/matieres/",
      {
        id:matiere.id,
        nomGroupe : this.authSevice.getNomGroupe(),
        idEcole:matiere.idEcole,
      nomMatiere : matiere.nomMatiere,
      abrege: matiere.abrege,
      estOptionnelle: matiere.estOptionnelle,
      icone: matiere.icone
    }
    ).subscribe((resp: any) => {
       // console.log(resp);
      }, (errorResp) => {
      //console.log(errorResp);
      });

  }*/


  updateMatiere(matiere :Matiere): Observable<any> {
    return Observable.create(observer => {
      this.http.put(this.authSevice.getSubDomain() + "/matieres", {
        id:matiere.id,
        nomGroupe : this.authSevice.getNomGroupe(),
        idEcole:matiere.idEcole,
        nomMatiere : matiere.nomMatiere,
        abrege: matiere.abrege,
        estOptionnelle: matiere.estOptionnelle,
        icone: matiere.icone
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

  /*getMatieresEcole(): Observable<any> {
    console.log("select ecole",this.authSevice.getIdSelectedEcole());

    return this.http.get<Matiere[]>(this.authSevice.getSubDomain()+"/matieresEcole/"+this.authSevice.getNomGroupe()+"/"+this.authSevice.getIdSelectedEcole())
  }*/


  getMatieresEcole(): Observable<any> {
    return Observable.create(observer => {
      this.http
        .get<Matiere[]>(
          this.authSevice.getSubDomain() +
          "/matieresEcole/" +
          this.authSevice.getNomGroupe() +
          "/" +
          this.authSevice.getIdSelectedEcole()
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
  getMatieresEcoleById(id): Observable<any> {
    return this.http.get<Matiere[]>(this.authSevice.getSubDomain()+"/matieresEcole/"+this.authSevice.getNomGroupe()+"/"+id)
  }


  getMatieresExcel(nomGroupe){
    return this.http.get<Matiere[]>(this.authSevice.getSubDomain()+"/matieres_Excel/"+nomGroupe);


  }
}
