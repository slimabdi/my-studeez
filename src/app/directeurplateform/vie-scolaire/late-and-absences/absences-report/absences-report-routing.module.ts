import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbsencesReportComponent } from './absences-report.component';

const routes: Routes = [{
  path:'',
  component:AbsencesReportComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbsencesReportRoutingModule { }
