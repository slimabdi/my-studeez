import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbsencesReportRoutingModule } from './absences-report-routing.module';
import { AbsencesReportComponent } from './absences-report.component';

@NgModule({
  imports: [
    CommonModule,
    AbsencesReportRoutingModule
  ],
  declarations: [AbsencesReportComponent]
})
export class AbsencesReportModule { }
