import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleStudentRoutingModule } from './schedule-student-routing.module';
import { ScheduleStudentComponent } from './schedule-student.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { SidebarModule } from 'ng-sidebar';

import { SidebarshedulestudentComponent } from './sidebarshedulestudent/sidebarshedulestudent.component';

import {  ScheduleService } from "../../../../services/schedule.service" 

import { MomentModule } from 'angular2-moment';
import { SidebarplagehoraireComponent } from './sidebarplagehoraire/sidebarplagehoraire.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ColorPickerModule } from 'ngx-color-picker';
import { BsDatepickerModule } from 'ngx-bootstrap';
import {LoaderComponentCalendar} from "../../../loader/loader.component"


@NgModule({
  imports: [
    CommonModule,
    MomentModule,
    ScheduleStudentRoutingModule,
    BsDatepickerModule.forRoot(),
    CalendarModule.forRoot(),
    BsDropdownModule.forRoot(),
    SidebarModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ScheduleStudentComponent,LoaderComponentCalendar, SidebarshedulestudentComponent, SidebarplagehoraireComponent],
  providers:[ScheduleService]
})
export class ScheduleStudentModule { }
