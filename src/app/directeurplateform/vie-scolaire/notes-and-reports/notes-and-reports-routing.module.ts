import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path:'',
  children:[
    {
      path:'notes',
      loadChildren:'./notes/notes.module#NotesModule'
    },
    {
      path:'reports',
      loadChildren:'./report/report.module#ReportModule'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesAndReportsRoutingModule { }
