import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminComponent } from './superadmin.component'
import { SuperadminRoutingModule } from './superadmin-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataTableModule} from "angular2-datatable";
import { DataFilterPipe } from './datafilterpipe';

import { ShowErrorssuperAdminComponent } from '../../show-errors.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataTableModule,
    ReactiveFormsModule,
    SuperadminRoutingModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    SuperAdminComponent,
    DataFilterPipe,
    ShowErrorssuperAdminComponent
  ]
})
export class SuperadminModule { }
