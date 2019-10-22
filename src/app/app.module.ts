import { BrowserModule } from "@angular/platform-browser";
import {NgModule, CUSTOM_ELEMENTS_SCHEMA, forwardRef} from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {ConnexionComponent } from './connexion/connexion.component';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./auth.guard";
import {AuthGuardGroup} from "./auth.guard.groups";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {EcoleService} from "./services/ecole.service";
import {GroupeScolaireService} from "./services/groupe-scolaire.service";
import {Ng2Webstorage} from "ngx-webstorage";
import { HomeGroupeScolaireComponent } from './home-groupe-scolaire/home-groupe-scolaire.component';
import { NavbarGroupesScolaireComponent } from './home-groupe-scolaire/navbar-groupes-scolaire/navbar-groupes-scolaire.component';
import { SidebarGroupesScolaireComponent } from './home-groupe-scolaire/sidebar-groupes-scolaire/sidebar-groupes-scolaire.component';
import {MatiereService} from "./services/matiere.service";
import {ClasseService} from "./services/classe.service";
import {ParentService} from "./services/parent.service";
import {EleveService} from "./services/eleve.service";
import {CompteProService} from "./services/comptePro.service";
import { ShowErrorsComponent } from './show-errors.component';
import { BirthYearValidatorDirective } from './validators/birth-year-validator.directive';
import { EmailValidatorDirective } from './validators/mail-validator.directive';
import { TelephoneNumberFormatValidatorDirective } from './validators/telephone-number-format-validator.directive';
import { CountryCityValidatorDirective } from './validators/country-city-validator.directive';
import { TelephoneNumbersValidatorDirective } from './validators/telephone-numbers-validator.directive';
import { UniqueNameValidatorDirective } from './validators/name-unique-validator.directive';
import {Globals} from "./models/globals";



import { AppRoutingModule } from './app-routing.module';
import { WelcomepgeComponent } from './welcomepge/welcomepge.component';
import {GroupeScolairesComponent} from "./admin/groupe-scolaires/groupe-scolaires.component";
import {GalerieService} from "./services/galerie.service";
import {ToastrService} from "ngx-toastr";
import {UpGalerie} from "./modelsDirecteurPlateform/UpGalerie.model";
import {UpGalerieService} from "./services/UpGalerie.service";

@NgModule({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    ConnexionComponent,
    HomeGroupeScolaireComponent,
    NavbarGroupesScolaireComponent,
    SidebarGroupesScolaireComponent,
    ShowErrorsComponent,
    BirthYearValidatorDirective,
    EmailValidatorDirective,
    TelephoneNumberFormatValidatorDirective,
    CountryCityValidatorDirective,
    TelephoneNumbersValidatorDirective,
    UniqueNameValidatorDirective,
    WelcomepgeComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    Ng2Webstorage,
    ReactiveFormsModule,
  ],
  providers: [

    AuthService,
    AuthGuard,
    AuthGuardGroup,
    EcoleService,
    CompteProService,
    GroupeScolaireService,
    EleveService,ParentService,
    ClasseService,MatiereService,GalerieService,UpGalerieService,
    [Globals]
    //CompteProService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
