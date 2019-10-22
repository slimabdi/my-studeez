import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InfirmaryModule} from "./infirmary/infirmary.module";
const routes: Routes = [{
  path:'',
  children:[
    {
      path:'infirmerie', 
      loadChildren:'./infirmary/infirmary.module#InfirmaryModule'
    },
    {
      path:'traveau',
      loadChildren:'./traveau-rendre/traveau-rendre.module#TraveauRendreModule'
    },
    {
      path:'schedule',
      loadChildren:'./schedule/schedule.module#ScheduleModule'
    },
    {
    path:'lates',
    loadChildren:'./late-and-absences/late-and-absences.module#LateAndAbsencesModule'
    },
    {
      path:'notes_and_report',
      loadChildren:'./notes-and-reports/notes-and-reports.module#NotesAndReportsModule'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes), InfirmaryModule],
  exports: [RouterModule]
})
export class VieScolaireRoutingModule { }
