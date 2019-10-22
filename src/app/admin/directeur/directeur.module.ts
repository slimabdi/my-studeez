import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataTableModule} from "angular2-datatable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DirecteurComponent } from './directeur.component';
import { ShowErrorsComponentdir2 } from '../../show-errors.component';
import { DirecteurRoutingModule } from './directeur-routing.module';
import {DirecteurNamePipe2} from "../../filters/directeur.pipe";

@NgModule({
  imports: [
    CommonModule,
    DirecteurRoutingModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [DirecteurComponent,DirecteurNamePipe2,ShowErrorsComponentdir2]
})
export class DirecteurModule { }

