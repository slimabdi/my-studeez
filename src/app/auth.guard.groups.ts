import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

import {AuthService} from "./services/auth.service";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map'




@Injectable()
export class AuthGuardGroup implements CanActivate {
  constructor(private http: HttpClient,  private auth:  AuthService, private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   if(this.auth.getLogin()!='admin'){
     /* this.http.get(this.auth.getSubDomain()+"/authguard").subscribe(dataa => {
            console.log(dataa);
          if(dataa["message"] == 'ko'){
              this.router.navigate(['groupescolaire']);
              return false;
          }else{
              if(dataa["message"] == 'ok') {
                console.log("user loged in auth guards");
                return true;
              } else {
                console.log("user not loged in auth guards");
                window.location.reload();
                return false
              }
          }
        },error=>{
          this.router.navigate(['groupescolaire']);
              return false;
        });
        */
        return true
   }else{
    this.router.navigate(['groupescolaire']);
     return false
   }
  }
}

