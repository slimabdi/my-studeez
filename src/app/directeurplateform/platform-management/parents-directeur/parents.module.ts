import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentsRoutingModule } from './parents-routing.module';
import { ParentsComponent } from './parents.component';
import {DataTableModule} from 'angular2-datatable';
import { NgxGaugeModule } from 'ngx-gauge';
import { SlideToggleModule } from 'ngx-slide-toggle';
import { PaginationModule } from 'ngx-bootstrap';
import { SidebarparentComponent } from './sidebarparent/sidebarparent.component';
import { SidebarModule } from 'ng-sidebar';
import { NgxInputFileUploadModule } from 'ngx-input-file-upload';
import {ParentsPipe2} from "../../../filters/parents.pipe";
import {FormsModule} from "@angular/forms";
import {ShowErrorsSidebarparentComponent} from "../../../show-errors.component";



@NgModule({
  imports: [
    CommonModule,
    ParentsRoutingModule,
    DataTableModule,
    NgxGaugeModule,
    PaginationModule.forRoot(),
    DataTableModule,
    SlideToggleModule,
    SidebarModule.forRoot(),
    NgxInputFileUploadModule,
    FormsModule,




  ],
 // schemas:[CUSTOM_ELEMENTS_SCHEMA],

  declarations: [ParentsComponent, SidebarparentComponent,ParentsPipe2,ShowErrorsSidebarparentComponent]
})
export class ParentsDirecteurModule { }
