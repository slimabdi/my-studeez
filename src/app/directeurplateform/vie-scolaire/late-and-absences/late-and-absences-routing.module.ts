import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path:'',
  children:[
    {
      path:'absences',
      loadChildren:'./absences-report/absences-report.module#AbsencesReportModule'
    },
    {
      path:'calls',
      loadChildren:'./calls-in-classroom/calls-in-classroom.module#CallsInClassroomModule'
    },
    {
      path:'justifications',
      loadChildren:'./justifications/justifications.module#JustificationsModule'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LateAndAbsencesRoutingModule { }
