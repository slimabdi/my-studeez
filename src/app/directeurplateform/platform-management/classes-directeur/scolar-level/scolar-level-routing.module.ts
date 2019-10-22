import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScolarLevelComponent } from './scolar-level.component';

const routes: Routes = [
  {
    path:'',
    component:ScolarLevelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScolarLevelRoutingModule { }
