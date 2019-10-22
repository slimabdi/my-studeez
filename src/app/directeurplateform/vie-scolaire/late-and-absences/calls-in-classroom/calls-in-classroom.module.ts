import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallsInClassroomRoutingModule } from './calls-in-classroom-routing.module';
import { CallsInClassroomComponent } from './calls-in-classroom.component';
import {DataTableModule} from 'angular2-datatable';
import { PaginationModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap';
import { SidebarcallsComponent } from './sidebarcalls/sidebarcalls.component';
import { SidebarModule } from 'ng-sidebar';
import { SlideToggleModule } from 'ngx-slide-toggle';
import { BsDatepickerModule } from 'ngx-bootstrap';





@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    PaginationModule.forRoot(),
    CallsInClassroomRoutingModule,
    SidebarModule.forRoot(),
    SlideToggleModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),

  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [CallsInClassroomComponent, SidebarcallsComponent]
})
export class CallsInClassroomModule { }
