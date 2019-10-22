import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeriodesComponent } from './periodes.component';

const routes: Routes = [
  {
    path:'',
    component:PeriodesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodesRoutingModule { }
