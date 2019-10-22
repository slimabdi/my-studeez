import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LateAndAbsencesRoutingModule } from './late-and-absences-routing.module';
import { SidebarModule } from 'ng-sidebar';





@NgModule({
  imports: [
    CommonModule,
    LateAndAbsencesRoutingModule,
    SidebarModule.forRoot()

  ],
  declarations: []
})
export class LateAndAbsencesModule { }
