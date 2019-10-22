import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScolarClassesComponent } from './scolar-classes.component';

const routes: Routes = [
  {
    path:'',
    component:ScolarClassesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScolarClassesRoutingModule { }
