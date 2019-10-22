import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StatistiquesComponent} from "../statistiques/statistiques.component";
import { StatistiquesRoutingModule } from './statistiques-routing.module';
import {ChartsModule} from "ng2-charts";

@NgModule({
  imports: [
    CommonModule,
    StatistiquesRoutingModule,
    ChartsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [StatistiquesComponent],
})
export class StatistiquesModule { }
