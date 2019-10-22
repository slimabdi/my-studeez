import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth.service";
import {UpGalerie} from "../modelsDirecteurPlateform/UpGalerie.model";
import {Galerie} from "../modelsDirecteurPlateform/Galerie.model";
import {ReponseUrl} from "../models/reponse-url";


@Injectable()
export class UpGalerieService {

  constructor(private http: HttpClient, private authSevice: AuthService) {
  }

  getalbumsEcole(): Observable<any> {
    return Observable.create(observer => {
      this.http.get<UpGalerie[]>(this.authSevice.getSubDomain() +
        "/gallerie/" +
        this.authSevice.getNomGroupe() +"/"+ this.authSevice.getIdSelectedEcole()
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





  deleteimage(id): Observable<ReponseUrl> {
    return this.http.delete<ReponseUrl>(
      this.authSevice.getSubDomain() +
      "/gallerie/image/" +
      this.authSevice.getNomGroupe() + "/" +id,

    );
  }



 /* getalbumsimages(): Observable<any> {
    return Observable.create(observer => {
      this.http.get<UpGalerie[]>(this.authSevice.getSubDomain() +
        "/gallerie/image/" +
        this.authSevice.getNomGroupe()
        //"/28"
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

  Addfichier(image :any,id:number): Observable<any> {
      console.log(image,id);
    return Observable.create(observer => {
      this.http.post(this.authSevice.getSubDomain() + "/gallerie/" + this.authSevice.getNomGroupe()+"/"+id , {
       idEcole:this.authSevice.getIdSelectedEcole(),image

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

}
