import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth.service";

import {Classe} from "../models/classes";
import {Enseignant} from "../models/enseignants";
import {Decoupage} from "../models/decoupage";

import {ReponseUrl} from "../models/reponse-url";
import {EnseignantsComponent} from "../admin/enseignants/enseignants.component";

@Injectable()
export class ClasseService {

  constructor(private http: HttpClient, private authService: AuthService) { }
////////*******Classes******/////
  getClasses(): Observable<Classe[]> {

    console.log("classes services")
    return this.http.get<Classe[]>(this.authService.getSubDomain()+"/classes/"+this.authService.getNomGroupe());
  }


  getClassesbyidEcole(idecole): Observable<any> {
   console.log(idecole);
    return this.http.get<Classe[]>(this.authService.getSubDomain()+"/classes/"+idecole+"/"+this.authService.getNomGroupe());
  }
  getClassesbyidEcoleandgroup(idecole,nomg){
    return this.http.get<Classe[]>(this.authService.getSubDomain()+"/classes/"+idecole+"/"+nomg);
    
  }
 
  updateClass(id,classObject){
    let body = classObject
    body.id=id
    body.idE=this.authService.getIdSelectedEcole()
    body.nomGroupe=this.authService.getNomGroupe()
    return Observable.create(observer => {
      this.http
        .put(this.authService.getSubDomain() + "/classes", body)
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

  getEnseignants(): Observable<Enseignant[]> {
    console.log("enseignants services")
    return Observable.create(observer => {
      this.http.get(this.authService.getSubDomain()+"/enseignants/"+this.authService.getNomGroupe()).subscribe((resp: any) => {
          console.log(resp);
          observer.next(resp);          
        }, (errorResp) => {
          console.log(errorResp);
          observer.next([]);
        })
   })
  }
  getEnseignantsbyidecole(id): Observable<Enseignant[]> {
    console.log("enseignants services")
    return Observable.create(observer => {
      this.http.get(this.authService.getSubDomain() + "/enseignants/" + this.authService.getNomGroupe()+ '/' +id).subscribe((resp: any) => {
          console.log(resp);
          observer.next(resp);          
        }, (errorResp) => {
          console.log(errorResp);
          observer.next([]);
        })
   })
  }


  getDecoupages(idecole){

    console.log("decoupages services")
    return Observable.create(observer => {
      this.http.get(this.authService.getSubDomain()+"/decoupageEcole/"+ idecole+'/' + this.authService.getNomGroupe()).subscribe((resp: any) => {
          console.log(resp);
          observer.next(resp);          
        }, (errorResp) => {
          console.log(errorResp);
          observer.next([]);
        })
   })
}

creerClasse(classe){
 let body = classe
console.log("creerClasse services")
    return Observable.create(observer => {
      this.http.post(this.authService.getSubDomain()+"/classes/"+this.authService.getNomGroupe()+"/"+this.authService.getIdSelectedEcole() ,body).subscribe((resp: any) => {
          console.log(resp);     
          observer.next(resp);          
        }, (errorResp) => {
          console.log(errorResp);
          observer.next([]);
        })
   })
}
creerNiveau(niveau){
  let body = niveau
 console.log("creerClasse services")
     return Observable.create(observer => {
       this.http.post(this.authService.getSubDomain()+"/niveau/"+this.authService.getNomGroupe()+"/"+this.authService.getIdSelectedEcole(),body).subscribe((resp: any) => {
           console.log(resp);     
           observer.next(resp);          
         }, (errorResp) => {
           console.log(errorResp);
           observer.next([]);
         })
    })
 
 }
getNiveau(idecole){

  console.log("niveauSection services")
  return Observable.create(observer => {
    this.http.get(this.authService.getSubDomain()+"/niveauSection/"+ idecole+'/' + this.authService.getNomGroupe()).subscribe((resp: any) => {
        console.log(resp);
        observer.next(resp);          
      }, (errorResp) => {
        console.log(errorResp);
        observer.next([]);
      })
 })
}

  //Ajouter une classe
  AddClasse(classe)
  {
    console.log(classe);
    let body =classe
    return Observable.create(observer => {

    this.http.post(this.authService.getSubDomain()+'/classes', body )
      .subscribe((resp: any) => {
        console.log(resp);
        observer.next(resp);          
      }, (errorResp) => {
        console.log(errorResp);
        observer.next([]);          
      });
    })
  }


  //modifier une classe
  updateClasse(classe){
    console.log(classe);
    let body =classe
    return Observable.create(observer => {    
    this.http.put(this.authService.getSubDomain()+"/classes",body).subscribe((resp: any) => {
      console.log(resp);
      observer.next(resp);                
    }, (errorResp) => {
      console.log(errorResp);
      observer.next([]);                
    });
  })
  }
   //get les matieres d'une classe
   getmatClass(id){
    return Observable.create(observer => {    
    this.http.get(this.authService.getSubDomain()+"/classesMat/"+this.authService.getIdSelectedEcole()+'/'+this.authService.getNomGroupe()+'/'+id).subscribe((resp: any) => {
      console.log(resp);
      observer.next(resp);                
    }, (errorResp) => {
      console.log(errorResp);
      observer.next([]);                
    });
  })
  }
  //supprimer une classe
  deleteClasse(id){
    return Observable.create(observer => {        
    this.http.get(this.authService.getSubDomain()+"/classes/"+this.authService.getIdSelectedEcole()+"/"+this.authService.getNomGroupe()+"/"+id).subscribe((resp: any) => {
      console.log(resp);
      observer.next(resp);                      
    }, (errorResp) => {
      console.log(errorResp);
      observer.next([]);                      
    });
  })
  }
  getClassesExcel(nomGroupe){
    return this.http.get<Classe[]>(this.authService.getSubDomain()+"/classes_Excel/"+nomGroupe);
  }
  candeleteSection(id){
    return Observable.create(observer => {        
      this.http.get(this.authService.getSubDomain()+"/section_validation/"+this.authService.getNomGroupe()+"/"+id).subscribe((resp: any) => {
        observer.next(resp);                      
      }, (errorResp) => {
        console.log(errorResp);
        observer.next([]);                      
      });
    })
  }

  getNiveaux(){
    console.log("getNiveaux")
    return Observable.create(observer => {
      this.http.get(this.authService.getSubDomain()+"/niveauSectionMatiere/"+ this.authService.getIdSelectedEcole()+'/' + this.authService.getNomGroupe()).subscribe((resp: any) => {
          console.log(resp);
          observer.next({niveaux:resp});          
        }, (errorResp) => {
          console.log(errorResp);
          observer.next({err:errorResp});
        })
   })
  }

  updateNiveaux(object){
    console.log('niveauxxxxxxxxxx',object);
    
    return Observable.create(observer => {
      this.http.put(this.authService.getSubDomain()+"/niveaux/"+  this.authService.getNomGroupe(),object).subscribe((resp: any) => {
          console.log(resp);
          observer.next(resp);          
        }, (errorResp) => {
          console.log(errorResp);
          observer.next({err:errorResp});
        })
   })
  }
}



