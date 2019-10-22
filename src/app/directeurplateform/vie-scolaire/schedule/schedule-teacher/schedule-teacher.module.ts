import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleTeacherRoutingModule } from './schedule-teacher-routing.module';
import { ScheduleTeacherComponent } from './schedule-teacher.component';
import { SidebarsheduleteacherComponent } from './sidebarsheduleteacher/sidebarsheduleteacher.component';

@NgModule({
  imports: [
    CommonModule,
    ScheduleTeacherRoutingModule
  ],
  declarations: [ScheduleTeacherComponent, SidebarsheduleteacherComponent]
})
export class ScheduleTeacherModule { }
