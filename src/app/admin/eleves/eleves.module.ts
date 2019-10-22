import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ElevesComponent} from "./eleves.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataTableModule} from "angular2-datatable";
import { ElevesPipe } from "../../filters/eleves.pipe";

import { ElevesRoutingModule } from './eleves-routing.module';
import {ShowErrorsComponenteleve} from "../../show-errors.component";

@NgModule({
  imports: [
    CommonModule,
    ElevesRoutingModule,
    FormsModule,
    DataTableModule,
    ReactiveFormsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ElevesComponent,ElevesPipe,ShowErrorsComponenteleve]
})
export class ElevesModule { }
