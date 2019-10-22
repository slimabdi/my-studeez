import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataTableModule} from "angular2-datatable";
// Ng2-select
import { SelectModule } from 'ng-select';
import { ClickOutsideModule } from 'ng4-click-outside';
import { DataFilterPipe } from './datafilterpipe';
import {DndModule} from 'ng2-dnd';


@NgModule({
  imports: [
    CommonModule,
    ClassesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    ClickOutsideModule,
    SelectModule,
    DndModule.forRoot()
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],  
  declarations: [ClassesComponent,DataFilterPipe],
  providers:[]
})
export class ClassesModule { }
