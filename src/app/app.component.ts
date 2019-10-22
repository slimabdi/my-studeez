import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { GroupeScolaireService } from "./services/groupe-scolaire.service";
import { environment } from "../environments/environment";
import { SessionStorageService } from "ngx-webstorage";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  nomDomaine = "app";
  constructor(
    private router: Router,
    private authService: AuthService,
    private sessionSt: SessionStorageService
  ) {
    let nomDomaine = document.location.hostname;
    let nomSubDomain = nomDomaine.split(".");
    console.log(nomSubDomain);
    console.log(nomDomaine);

    if (nomSubDomain[0] || nomSubDomain[0] == environment.domainName) {
      this.authService.setLogin(nomSubDomain[0]);
      this.authService.destroySubDomain();
      this.authService.destroyNomGroupe();
      if (nomSubDomain[2] == null) {
        this.authService.saveSubDomain(
          "http://" + nomSubDomain[0] + ".my-studeez.fr/api"
        );
      } else {
        this.authService.saveSubDomain(
          "http://" +
            nomSubDomain[0] +
            "." +
            nomSubDomain[1] +
            "." +
            nomSubDomain[2] +
            "/api"
        );
      }
      this.authService.saveNomGroupe("STUDEEZ");
    }
    //  else {
    //   this.authService.destroySubDomain();
    //   this.authService.destroyNomGroupe();

    //   if (nomSubDomain[2] == null) {
    //     this.authService.saveSubDomain(
    //       "http://" + nomSubDomain[0] + ".my-studeez.fr/api"
    //     );
    //   } else {
    //     this.authService.saveSubDomain(
    //       "http://" +
    //         nomSubDomain[0] +
    //         "." +
    //         nomSubDomain[1] +
    //         "." +
    //         nomSubDomain[2] +
    //         "/api"
    //     );
    //   }
    //   this.authService.saveNomGroupe(nomSubDomain[0]);
    //   //  this.router.navigate(["groupescolaire"]);
    //   this.authService.setLogin(nomSubDomain[0]);
    // }
  }
}
