import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataTableModule} from "angular2-datatable";
import { PersonnelscolaireComponent } from './personnelscolaire.component'
import { PersonnelscolaireRoutingModule } from './personnelscolaire-routing.module';
import { ShowErrorsComponentpersonnel } from '../../show-errors.component';
import {PersonnelNamePipe} from "../../filters/personnel.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    PersonnelscolaireRoutingModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [PersonnelscolaireComponent, PersonnelNamePipe,ShowErrorsComponentpersonnel]
})
export class PersonnelscolaireModule { }
