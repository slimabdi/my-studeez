import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import {DataTableModule} from 'angular2-datatable';
import { NgxGaugeModule } from 'ngx-gauge';
import { SlideToggleModule } from 'ngx-slide-toggle';
import { PaginationModule } from 'ngx-bootstrap';
import {SidebarModule} from "ng-sidebar";
import {FormsModule} from "@angular/forms";
import {ElevesPipe2} from "../../../filters/eleves.pipe";
import {SidebarStudentComponent} from "./sidebarStudent/sidebarStudent.component";
import {ShowErrorsSidebarStudentComponent} from "../../../show-errors.component";


@NgModule({
  imports: [
    StudentsRoutingModule,
    NgxGaugeModule,
    CommonModule,
    DataTableModule,
    SlideToggleModule,
    FormsModule,
    SidebarModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  declarations: [StudentsComponent,SidebarStudentComponent,ElevesPipe2,ShowErrorsSidebarStudentComponent]
})
export class StudentsModule { }
