import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";
@Injectable()
export class ScheduleService {
  cours: any = {
    idClasse: "1",
    idMatiere: "2",
    idEnseignant: "3",
    "idCo-Enseig": "4",
    typeCreation: "test",
    dateCours: "2017-06-01",
    Hdebut: "10:20",
    Hfin: "12:12",
    frequence: "Lundi",
    idgroupe: "2",
    idSalle: "5",
    codeCouleur: "#f5f5f5",
    titreCours: "titreC",
    fichierCours: "fC",
    titreTravail: "titreT",
    fichierT: "fT",
    titreControle: "titreControle",
    dateControle: "2017-06-01",
    duC: "10:20",
    auC: "12:12"
  };
  plageH: any = [
    {
      jour: "Lundi",
      Horaire: [{ du: "10:00", au: "10:10" }, { du: "10:20", au: "10:30" }]
    },
    {
      jour: "Mardi",
      Horaire: [{ du: "10:40", au: "10:50" }, { du: "10:80", au: "10:90" }]
    }
  ];
  constructor(private http: HttpClient, private authService: AuthService) {}

  // • Plage Horaires (Ajout)
  createPlageH(plageH, idClasse) {
    let body = plageH;
    return Observable.create(observer => {
      this.http
        .post(
          this.authService.getSubDomain() +
            "/plageHoraireEDT/" +
            this.authService.getNomGroupe +
            "/" +
            idClasse,
          body
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

  // •	Ajouter un cours
  createCourse(cours) {
    let body = cours;
    return Observable.create(observer => {
      this.http
        .post(this.authService.getSubDomain() + "/cours", body)
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

  // •	Modifier un cours  dans une seance
  updateCourse(cours, idSeance) {
    let body = cours;
    return Observable.create(observer => {
      this.http
        .put(
          this.authService.getSubDomain() +
            "/detailsCourEDT/" +
            this.authService.getNomGroupe() +
            "/" +
            idSeance +
            "/" +
            this.authService.getIdSelectedEcole(),
          body
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

  // •	Afficher les détails d’une seance
  getSeanceDetails(idSeance) {
    return Observable.create(observer => {
      this.http
        .get(
          this.authService.getSubDomain() +
            "/detailsCourEDT/" +
            this.authService.getNomGroupe() +
            "/" +
            idSeance
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

  // •	Afficher la liste des seances
  getAllSeances() {
    return Observable.create(observer => {
      this.http
        .get(
          this.authService.getSubDomain() +
            "/courEDT/" +
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

  // 	•	Annuler une seance
  CancelSeance(idSeance) {
    return Observable.create(observer => {
      this.http
        .put(
          this.authService.getSubDomain() +
            "/annulerCours/" +
            this.authService.getNomGroupe(),

          { idSeance: idSeance }
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

  // •	Supprimer une seance
  DeleteSeance(idSeance) {
    return Observable.create(observer => {
      this.http
        .get(
          this.authService.getSubDomain() +
            "/deleteCourEDT/" +
            this.authService.getNomGroupe() +
            "/" +
            idSeance
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
            id +
            "/" +
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
            id +
            "/" +
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
}
