import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";

@Injectable()
export class GroupeAndRegroupingService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  //**********************************Groupements*******************************
  //get groupment liste
  getGroupements() {
    return Observable.create(observer => {
      this.http
        .get(
          this.authService.getSubDomain() +
            "/groupe/" +
            this.authService.getIdSelectedEcole() +
            "/" +
            this.authService.getNomGroupe()
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

  //get groupement by id
  getGroupementbyid(id) {
    return Observable.create(observer => {
      this.http
        .get(
          this.authService.getSubDomain() +
            "/groupeX/" +
            id +
            "/" +
            this.authService.getNomGroupe()
        )
        .subscribe(
          (resp: any) => {
            console.log(resp);
            observer.next(resp);
          },
          errorResp => {
            console.log(errorResp);
            observer.next({ err: errorResp });
          }
        );
    });
  }
  //get classes by id groupe
  getClassbyGroupementId(id) {
    return Observable.create(observer => {
      this.http
        .get(
          this.authService.getSubDomain() +
            "/eleve/" +
            id +
            "/" +
            this.authService.getNomGroupe()
        )
        .subscribe(
          (resp: any) => {
            console.log(resp);
            observer.next(resp);
          },
          errorResp => {
            console.log(errorResp);
            observer.next({ err: errorResp });
          }
        );
    });
  }

  //create groupment
  createGroupement(obj) {
    let body = obj;
    body.idEcole = this.authService.getIdSelectedEcole();
    body.nomGroupe = this.authService.getNomGroupe();
    return Observable.create(observer => {
      this.http
        .post(this.authService.getSubDomain() + "/groupes", body)
        .subscribe(
          (resp: any) => {
            console.log(resp);
            observer.next(resp);
          },
          errorResp => {
            console.log(errorResp);
            observer.next({ err: errorResp });
          }
        );
    });
  }
  //update groupment
  updateGroupement(obj) {
    let body = {
      abregeGpe: obj.abregeGpe,
      nomGpe: obj.nomGpe,
      id: obj.id,
      idEcole: this.authService.getIdSelectedEcole(),
      nomGroupe: this.authService.getNomGroupe(),
      objGroupeEleve: obj.objGroupeEleve,
      avatar: obj.avatar
    };

    return Observable.create(observer => {
      this.http
        .put(this.authService.getSubDomain() + "/groupes", body)
        .subscribe(
          (resp: any) => {
            console.log(resp);
            observer.next(resp);
          },
          errorResp => {
            console.log(errorResp);
            observer.next({ err: errorResp });
          }
        );
    });
  }
  //Delete groupement
  deleteGroupement(id) {
    return Observable.create(observer => {
      this.http
        .get(
          this.authService.getSubDomain() +
            "/groupes/" +
            id +
            "/" +
            this.authService.getNomGroupe()
        )
        .subscribe(
          (resp: any) => {
            console.log(resp);
            observer.next(resp);
          },
          errorResp => {
            console.log(errorResp);
            observer.next({ err: errorResp });
          }
        );
    });
  }
  //get student by id class
  getStudents(id) {
    return Observable.create(observer => {
      this.http
        .get(
          this.authService.getSubDomain() +
            "/eleveClasse/" +
            id +
            "/" +
            this.authService.getNomGroupe()
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

 

  //get classe by niveau
  getClassByIdC(id) {
    return Observable.create(observer => {
      this.http
        .get(
          this.authService.getSubDomain() +
            "/classe/" +
            this.authService.getIdSelectedEcole() +
            "/" +
            id +
            "/" +
            this.authService.getNomGroupe()
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
//get classes
getclasses() {
  return Observable.create(observer => {
    this.http
      .get(
        this.authService.getSubDomain() +
          "/classe/" +
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
          observer.next({ error: errorResp });
        }
      );
  });
}
  //******************************Regroupement ************************
    //get subjects
    getMatieres() {
      return Observable.create(observer => {
        this.http
          .get(
            this.authService.getSubDomain() +
              "/matiere/" +
              this.authService.getIdSelectedEcole() +
              "/" +
              this.authService.getNomGroupe()
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
     //get enseignants by id matiere
     getEnsei(id) {
      return Observable.create(observer => {
        this.http
          .get(
            this.authService.getSubDomain() +
              "/enseignantMatiere/" +
              id+"/"+
              this.authService.getIdSelectedEcole() +
              "/" +
              this.authService.getNomGroupe()
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
     //get Co-enseignants by id matiere
     getco_ensei(id) {
      return Observable.create(observer => {
        this.http
          .get(
            this.authService.getSubDomain() +
              "/CoenseignantMatieres/" +
              id+"/"+
              this.authService.getIdSelectedEcole() +
              "/" +
              this.authService.getNomGroupe()
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
  //get regroupemnets
  getRegroupements() {
    return Observable.create(observer => {
      this.http
        .get(
          this.authService.getSubDomain() +
            "/regroupement/" +
            this.authService.getIdSelectedEcole() +
            "/" +
            this.authService.getNomGroupe()
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
  //Attributs d’un regroupement X
  getReroupmentDetails(id) {
    return Observable.create(observer => {
      this.http
        .get(
          this.authService.getSubDomain() +
            "/regroupeX/" +
            id +
            "/" +
            this.authService.getNomGroupe()
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
  //Create  regroupement
  createRegroupement(obj) {
    let body = obj;
    body.idEcole = this.authService.getIdSelectedEcole();
    body.nomGroupe = this.authService.getNomGroupe();
    return Observable.create(observer => {
      this.http
        .post(this.authService.getSubDomain() + "/regroupes", body)
        .subscribe(
          (resp: any) => {
            console.log(resp);
            observer.next(resp);
          },
          errorResp => {
            console.log(errorResp);
            observer.next({ err: errorResp });
          }
        );
    });
  }
  //update regroupement
  updateRegroupementt(obj) {
    let body = obj;
    body.idEcole = this.authService.getIdSelectedEcole();
    body.nomGroupe = this.authService.getNomGroupe();
    return Observable.create(observer => {
      this.http
        .put(this.authService.getSubDomain() + "/regroupes", body)
        .subscribe(
          (resp: any) => {
            console.log(resp);
            observer.next(resp);
          },
          errorResp => {
            console.log(errorResp);
            observer.next({ err: errorResp });
          }
        );
    });
  }
  //Delete groupement
  deleteRegroupement(id) {
    return Observable.create(observer => {
      this.http
        .get(
          this.authService.getSubDomain() +
            "/regroupes/" +
            id +
            "/" +
            this.authService.getNomGroupe()
        )
        .subscribe(
          (resp: any) => {
            console.log(resp);
            observer.next(resp);
          },
          errorResp => {
            console.log(errorResp);
            observer.next({ err: errorResp });
          }
        );
    });
  }

}
