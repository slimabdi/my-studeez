import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataTableModule} from "angular2-datatable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ParentsComponent } from './parents.component'
import { ParentsRoutingModule } from './parents-routing.module';
import { ParentsPipe } from "../../filters/parents.pipe";
import {ShowErrorsComponentparent} from "../../show-errors.component";

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    ParentsRoutingModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ParentsComponent,ParentsPipe,ShowErrorsComponentparent]
})
export class ParentsModule { }
