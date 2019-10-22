import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirecteurRoutingModule } from './directeur-routing.module';
import { DirecteurComponent } from './directeur.component';
import {DataTableModule} from 'angular2-datatable';
import { NgxGaugeModule } from 'ngx-gauge';
import { SlideToggleModule } from 'ngx-slide-toggle';
import { PaginationModule } from 'ngx-bootstrap';
import {FormsModule} from "@angular/forms";
import {DirecteurNamePipe} from "../../../filters/directeur.pipe";
import { SidebarModule } from 'ng-sidebar';
import { SidebardirecteurComponent } from './sidebardirecteur/sidebardirecteur.component';
import { ShowErrorsComponentdir } from '../../../show-errors.component';
import { NgxInputFileUploadModule } from 'ngx-input-file-upload';
import { ToastrModule } from 'ngx-toastr';
import { DataFilterPipe } from './datafilterpipe';

@NgModule({
  imports: [
    CommonModule,
    DirecteurRoutingModule,
    DataTableModule,
    NgxGaugeModule,
    PaginationModule.forRoot(),
    DataTableModule,
    SlideToggleModule,
    NgxGaugeModule,
    FormsModule,
    SidebarModule.forRoot(),
    ToastrModule.forRoot(),
    NgxInputFileUploadModule,
  ],
  declarations: [DirecteurComponent,DirecteurNamePipe, SidebardirecteurComponent,ShowErrorsComponentdir,DataFilterPipe]
})
export class directeurManagementModule { }
