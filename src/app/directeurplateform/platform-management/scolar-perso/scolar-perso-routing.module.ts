import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScolarPersoComponent } from './scolar-perso.component';

const routes: Routes = [
  {
    path:'',
    component:ScolarPersoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScolarPersoRoutingModule { }
