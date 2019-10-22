import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import {Observable} from "rxjs/Observable";
import { Infermerie} from "../modelsDirecteurPlateform/infermerie.model";
import { Ajoutercarnet } from '../modelsDirecteurPlateform/ajoutercarnet.model'
import {AuthService} from "./auth.service";
import {Carnet} from "../modelsDirecteurPlateform/carnet.model"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { Carnetsante } from '../modelsDirecteurPlateform/carnetsante.model';
import {GroupeAndRegroupingService} from "./groupe-and-regrouping.service"
@Injectable()
export class InfermerieService {
  x : Infermerie;
  Listmalade : Infermerie[];
  Listecarnet : Carnet={ idE : null,
    idEleve : null,
    observation : '' ,
    allergie : '' ,
    responsable1 : '' ,
    tel1 : '',
    responsable2 : '' ,
    tel2 : '' ,
    DocumentMedical:'' }
  idclass1:any;
  Ajouterlisteleve : Carnet[]
  carnetsante : Carnetsante;
  constructor(private http: HttpClient, private authService:AuthService , private https : Http , private idclass : GroupeAndRegroupingService) { }


 
  /*ajouterinfermerie(infermerie: Infermerie): Observable<any> {
    console.log("infermerie service", infermerie);
    return Observable.create(observer => {
      this.http.post(this.authService.getSubDomain() + "/infermerie", {
        idEcole: infermerie,
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
  */

 ajouterinfermerie(mal : Infermerie){
  let body:any = mal;
  body.nomGroupe=this.authService.getNomGroupe()

  return this.https.post(this.authService.getSubDomain() + "/infermerie",body);
}


putinfermier(x){

  console.log("service update " ,x.idEleve);

  this.http.put(this.authService.getSubDomain()+"/infermerie" , {x, nomGroupe:this.authService.getNomGroupe()}).subscribe((resp: any) => {
    console.log(resp);
  }, (errorResp) => {
    console.log(errorResp);
  });
}

getidinfermier() {
  return this.http.get(this.authService.getSubDomain() + "/infermerie")
}
getcarnetPassage(idEleve) {
  return Observable.create(observer => {
    this.http
      .get(
        this.authService.getSubDomain() + "/carnetEleve/"+this.authService.getNomGroupe()+"?idEleve="+idEleve
      )
      .subscribe(
        (resp: any) => {
          console.log(resp);
          observer.next(resp);
        },
        errorResp => {
          console.log(errorResp);
          observer.next({ error: errorResp });
        }
      );
  });
}
editinfermier(id) {
  const uri = this.authService.getSubDomain() + "/infermerie" + id;
  return this
          .http
          .get(uri)
}

//modifier infermirie
/*
  modifierInfermerie(infermerie: Infermerie): Observable<any> {
    console.log("update service");
    return Observable.create(observer => {
       this.http.put(this.authService.getSubDomain() + "/infermerie", {
        idEcole: infermerie,
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
  */

getInfermerie(){
  return this.http.get<Infermerie[]>(this.authService.getSubDomain()+"/infermerie/"+this.authService.getNomGroupe()+"/"+this.authService.getIdSelectedEcole());
}

/*
getInfermerie(): Observable<Infermerie[]>{
  return this.http
   .get(this.authService.getSubDomain()+"/infermerie/"+this.authService.getNomGroupe()+"/"+this.authService.getIdSelectedEcole())
   .map((response: Response)=> {
     return <Infermerie[]>response.json();
   })
   .catch(this.handleError);
}

private handleError(error: Response) {
 return Observable.throw(error.statusText);
*/
//Supprimer infermrie 
deleteInfermerie(id: number){
    return this.http.get(this.authService.getSubDomain()+"/infermerieDelete/"+id+'/'+this.authService.getNomGroupe());
}

  geteleveobservation(idclass){
    return this.http.get<Carnetsante[]>(this.authService.getSubDomain()+"/carnet/"+ this.authService.getNomGroupe() + "/" +idclass)
  }

    /*   afficher   une nouvelle carnet des eleve  par Classe  */
    getelevecarnetClasse(idClasse) {
  
      return this.http.get(this.authService.getSubDomain() +"/Elevecarnet/" + idClasse + "/" + this.authService.getNomGroupe())
    }

  getcarnetsante(idCarnet){
      return this.http.get(this.authService.getSubDomain() + "/Elevecarnet/" + idCarnet + "/"+this.authService.getNomGroupe())
  }



  getcarnet(){
    return this.http.get<Carnet[]>(this.authService.getSubDomain()+"/carnets/"+ this.authService.getNomGroupe() + "/" +this.authService.getIdSelectedEcole())
  }

   ajoutcarnet(carnet:Carnet){
     let body :any = carnet
return this.http.post<Carnet[]>(this.authService.getSubDomain()+"/carnets",body)
   }


    putcarnet(carnet){

      console.log("service update " ,carnet.idEleve);
    
      this.http.put(this.authService.getSubDomain()+"/carnets" , {carnet, nomGroupe:this.authService.getNomGroupe()}).subscribe((resp: any) => {
        console.log(resp);
      }, (errorResp) => {
        console.log(errorResp);
      });
    }




    deletecarnet(id: number){
      return this.http.get<Carnet[]>(this.authService.getSubDomain()+"/carnetDelete/"+id+'/'+this.authService.getNomGroupe());
  }

}
