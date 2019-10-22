import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataTableModule} from "angular2-datatable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatieresRoutingModule } from './matieres-routing.module';
import { MatieresComponent } from './matieres.component'
import {MatieresPipe} from "../../filters/matieres.pipe";
import {ShowErrorsComponentmatiere} from "../../show-errors.component";

@NgModule({
  imports: [
    CommonModule,
    MatieresRoutingModule,
    FormsModule,
    DataTableModule,
    ReactiveFormsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    MatieresComponent,
    ShowErrorsComponentmatiere,
    MatieresPipe
  ]
})
export class MatieresModule { }
