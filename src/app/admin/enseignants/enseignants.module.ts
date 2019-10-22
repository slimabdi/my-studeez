import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataTableModule} from "angular2-datatable";
import { EnseignantsRoutingModule } from './enseignants-routing.module';
import { EnseignantsComponent } from './enseignants.component'
import {ShowErrorsComponentenseignant} from "../../show-errors.component";
import {EnseignantPipe} from "../../filters/enseignant.pipe";
@NgModule({
  imports: [
    CommonModule,
    EnseignantsRoutingModule,
    FormsModule,
    DataTableModule,
    ReactiveFormsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [EnseignantsComponent,ShowErrorsComponentenseignant,EnseignantPipe]
})
export class EnseignantsModule { }
