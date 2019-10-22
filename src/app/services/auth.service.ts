import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { User } from "../models/user";
import { Observable } from "rxjs/Observable";
import { SessionStorageService } from "ngx-webstorage";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class AuthService {
  selectedgroup = new BehaviorSubject<any>({ id: null });
  updategroups = new BehaviorSubject<any>({ updat: false });
  // les attribues
  private loggedIn: any = "false";
  private loggedIndir :any =false
  public user: User;
  public adminGroupeScolaire: any = "http://admin.my-studeez.fr/api";
  // le constructeur
  constructor(
    private http: HttpClient,
    private router: Router,
    private sessionSt: SessionStorageService
  ) {}
  setupdategroups(obj) {
    console.log(obj);
    this.updategroups.next({ updat: obj });
  }
  getupdategroups() {
    return this.updategroups.asObservable();
  }

  setgroupe(obj) {
    console.log(obj);
    this.selectedgroup.next({ id: obj });
  }
  getgroupe() {
    return this.selectedgroup.asObservable();
  }

  //getter et setter subdomain
  saveSubDomain(nomSubDomain: string) {
    this.sessionSt.store("subdomain", nomSubDomain);
  }
  getSubDomain(): string {
    //return "http://admin.my-studeez.fr/api";
      return 'http://localhost:3000/api'
  // return this.sessionSt.retrieve("subdomain");
  }
  destroySubDomain() {
    this.sessionSt.clear("subdomain");
  }

  //---------------------------------------------- getter et setter Nomgroupe ou  nom base de données //////

  saveNomGroupe(nomGroupe: string) {
    this.sessionSt.store("nomGroupe", nomGroupe);
  }
  destroyNomGroupe() {
    this.sessionSt.clear("nomGroupe");
  }
  getNomGroupe() {
    return this.sessionSt.retrieve("nomG");
  }
  setNomGroupe(i) {
    this.sessionSt.store("nomG", i);
  }

  //--------------------------------------------------------------------------//

  getUser() {
    return this.user;
  }

  setUser(userApi: User) {
    this.user = userApi;
  }

  updateUser(user :User) {

    console.log("user",user)
    console.log("user id",user.nom)
      this.http
        .put(this.getSubDomain() + "/modif/",
          {
            id:user.id,
            nom:user.prenom,
            prenom:user.prenom,
            avatar:user.avatar,
            login:user.login,
            OldPwd:user.OldPwd,
            NewPwd:user.NewPwd,


          }
        )
        .subscribe(
          (resp: any) => {

          },
          errorResp => {
            console.log(errorResp);
          }
        );

  }

  setConnectedUser(i) {
    this.sessionSt.store("User", i);
  }

  getConnectedUser() {
    return this.sessionSt.retrieve("User");
  }

  loginUserPlateform(email: string, password: string) {
    let body = {
      login: email,
      password: password
    };
    return Observable.create(observer => {
      this.http
        .post(this.getSubDomain() + "/auth/sign_in_user_plateform", body)
        .subscribe(
          (resp: any) => {
            this.setLogin("admin");
            this.setUser(resp.user);
            this.setConnectedUser(resp.user);
            //navigate
            this.router.navigate(["home"]);
            observer.next(resp);
          },
          errorResp => {
            console.log(errorResp);
            observer.next(errorResp);
          }
        );
    });
  }
  //////////////////////////////////////////
  getUserLoggedIn() {
    return this.loggedIn;
  }

  setUserLoggedIn() {
    this.loggedIn = true;
  }

  ////////////////////////////////////////////////////////////
  setLogin(i) {
    this.sessionSt.store("Login", i);
  }

  getLogin() {
    return this.sessionSt.retrieve("Login");
  }

  /////////////////////////////////////////////////////////////////
  //////////////////////////////////////////
  getUserLoggedIndir() {
    return this.loggedIndir;
  }

  setUserLoggedIndir(val) {
    this.loggedIndir = val;
  }

  saveIdEcole(idE: number) {
    this.sessionSt.store("idE", idE);
  }
  destroyIdEcole() {
    this.sessionSt.clear("idE");
    this.sessionSt.clear("idSelectedEcole");
  }
  setIdSelectedEcole(i) {
    this.sessionSt.store("idSelectedEcole", i);
    //this.sessionSt.store("nomE", i);
  }

  getIdSelectedEcole() {
    return this.sessionSt.retrieve("idSelectedEcole");
    //return this.sessionSt.retrieve("nomE");
  }

///////////////////
setMyschoolInfo(monEcole){
  this.sessionSt.store("monecole", monEcole);
}
getMyschoolInfo(monEcole){
 return this.sessionSt.retrieve("monecole");
}
destroyMyschoolInfo(){
   this.sessionSt.clear("monecole");
 }
 getlogoEcole(){
   let ecole =this.sessionSt.retrieve("monecole");
   return ecole.logoBarreTache
 }
 getNomEcole(){
  let ecole =this.sessionSt.retrieve("monecole");
  return ecole.nomEcole
 }
 getSidebarColorEcole(){
  let ecole =this.sessionSt.retrieve("monecole");
  return ecole.couleurBarreTache
 }
 getExternColorEcole(){
  let ecole =this.sessionSt.retrieve("monecole");
  return ecole.couleurExterne
 }
/////////////////


  // methode pour l'authentification des admins des plateforms

  /////log out
  logoutUser() {
    //make get synchrone with map
    this.http
      .get(this.getSubDomain() + "/sign_out1")
      .map((res: Response) => res)
      .subscribe(data => {
        this.router.navigate(["admin"]);
      });
  }

  loginUserGroupe(email: string, password: string) {
      return Observable.create(observer => {
        this.http
        .post(this.getSubDomain() + "/auth/sign_in_user_groupe/"+this.getIdSelectedEcole(), {
          login: email,
          password: password,
          nomGroupe: this.getNomGroupe()
        })
        .subscribe(
          (resp: any) => {
            this.setUserLoggedIndir(true);
            this.setUser(resp.user);
            observer.next(resp);
          },
          errorResp => {
            this.setUserLoggedIndir(false);
            console.log("error");
            console.log(errorResp);
            this.loggedIn = false;
            observer.next(errorResp);
          }
        );
      });
  }

  // logoutUser() {
  //   //this.destroyToken();
  //   //this.destroyNomGroupe();
  //   //this.destroySubDomain();

  //   //this.loggedIn = false;

  //   localStorage.clear();
  //   this.http.get(this.getSubDomain() + "/sign_out1");

  //   this.router.navigate(["admin"]);

  //   //console.log("log ouuuuuut",this.getSubDomain()+"/sign_out1");
  // }

  getEcolesByGroupeScolaire(groupe) {
    return Observable.create(observer => {
      this.http
        .get(this.adminGroupeScolaire + "/perso_groupe_scolaire/" + groupe)
        .subscribe(
          (resp: any) => {
            console.log(resp);
            observer.next(resp);
          },
          errorResp => {
            console.log(errorResp);
            observer.next(errorResp);
          }
        );
    });
  }
  getGroupeScolairebydom(domaine) {
    return Observable.create(observer => {
      this.http
        .get(this.getSubDomain() + "/groupe_scolaire_precise/" + domaine)
        .subscribe(
          (resp: any) => {
            console.log(resp);
            observer.next(resp);
          },
          errorResp => {
            console.log(errorResp);
            observer.next(errorResp);
          }
        );
    });
  }
}
