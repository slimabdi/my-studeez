import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'angular-calendar';
import { ScolarCalendarRoutingModule } from './scolar-calendar-routing.module';
import { ScolarCalendarComponent } from './scolar-calendar.component';
import { BsDropdownModule } from 'ngx-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    ScolarCalendarRoutingModule,
    CalendarModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ScolarCalendarComponent]
})
export class ScolarCalendarModule { }
