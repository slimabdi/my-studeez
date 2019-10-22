import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EcolesComponent} from "../ecoles/ecoles.component";
import { EcolesNamePipe } from "../../filters/ecoles-name.pipe";

import { EcolesRoutingModule } from './ecoles-routing.module';
import {ColorPickerModule} from "ngx-color-picker";
import {DataTableModule} from "angular2-datatable";
import {ShowErrorsComponentEcole} from "../../show-errors.component";
import {MyDatePickerModule} from "ng4-datepicker";

@NgModule({
  imports: [
    CommonModule,
    EcolesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    ColorPickerModule,
    MyDatePickerModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [EcolesComponent,EcolesNamePipe,ShowErrorsComponentEcole],
})
export class EcolesModule { }
