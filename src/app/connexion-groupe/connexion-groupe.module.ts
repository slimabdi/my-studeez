import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConnexionGroupeComponent } from "./connexion-groupe.component";
import { ConnexionGroupeRoutingModule } from "./connexion-groupe-routing.module";
import { LoaderpageComponent } from "../loaderpage/loaderpage.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ConnexionGroupeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ConnexionGroupeComponent, LoaderpageComponent]
})
export class ConnexionGroupeModule {}
