import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnseignantsComponent } from './enseignants.component'

const routes: Routes = [
  {
  path:'',
  component:EnseignantsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnseignantsRoutingModule { }
