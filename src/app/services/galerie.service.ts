import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Galerie} from "../modelsDirecteurPlateform/Galerie.model";
import {AuthService} from "./auth.service";
import {ReponseUrl} from "../models/reponse-url";



@Injectable()
export class GalerieService {

  constructor(private http: HttpClient, private authSevice: AuthService) {
  }


  getalbumsEcole(): Observable<any> {
    return Observable.create(observer => {
      this.http.get<Galerie[]>(this.authSevice.getSubDomain() +
          "/gallerie/" +
          this.authSevice.getNomGroupe() +
          "/"+this.authSevice.getIdSelectedEcole()
          //this.authSevice.getIdSelectedEcole()
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
 /* supprimelistalbum(id): Observable<any> {
    return Observable.create(observer => {
      this.http.delete<Galerie[]>(this.authSevice.getSubDomain() +
        "/gallerie/" +
        this.authSevice.getNomGroupe() +"/"+id,

        //this.authSevice.getIdSelectedEcole()
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
  }*/

  deletealbum(id): Observable<ReponseUrl> {
    return this.http.delete<ReponseUrl>(
      this.authSevice.getSubDomain() +
      "/gallerie/" +
      this.authSevice.getNomGroupe() +"/"+id,
    );
  }


  Addalbum(galerie :Galerie): Observable<any> {
    return Observable.create(observer => {
      this.http.post(this.authSevice.getSubDomain() + "/gallerie/" + this.authSevice.getNomGroupe(), {
        titre:galerie.titre,idEcole:this.authSevice.getIdSelectedEcole(),files:galerie.files

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


  updatealbum(galerie :Galerie): Observable<any> {
    return Observable.create(observer => {
      this.http.put(this.authSevice.getSubDomain() + "/gallerie/" + this.authSevice.getNomGroupe(), {
        titre:galerie.titre,idEcole:this.authSevice.getIdSelectedEcole(),files:[]

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
