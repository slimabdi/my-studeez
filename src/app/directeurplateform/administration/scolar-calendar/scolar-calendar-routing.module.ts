import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScolarCalendarComponent } from './scolar-calendar.component';

const routes: Routes = [
  {
    path:'',
    component: ScolarCalendarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScolarCalendarRoutingModule { }
