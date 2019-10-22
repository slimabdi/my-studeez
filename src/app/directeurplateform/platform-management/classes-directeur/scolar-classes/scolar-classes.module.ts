import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScolarClassesRoutingModule } from './scolar-classes-routing.module';
import { ScolarClassesComponent } from './scolar-classes.component';


import {DataTableModule} from 'angular2-datatable';
import { NgxGaugeModule } from 'ngx-gauge';
import { SlideToggleModule } from 'ngx-slide-toggle';
import { PaginationModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SidebarscolarclassComponent } from './sidebarscolarclass/sidebarscolarclass.component';
import { SidebarModule } from 'ng-sidebar';
import {FormsModule} from "@angular/forms";
import { NgxInputFileUploadModule } from 'ngx-input-file-upload';
import { DataFilterPipe } from './datafilterpipe';
 
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ScolarClassesRoutingModule,
    DataTableModule,
    NgxGaugeModule,
    PaginationModule.forRoot(),
    DataTableModule,
    SlideToggleModule,
    BsDatepickerModule.forRoot(),
    SidebarModule.forRoot(),
    NgxInputFileUploadModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ScolarClassesComponent, SidebarscolarclassComponent,DataFilterPipe]
})
export class ScolarClassesModule { }
