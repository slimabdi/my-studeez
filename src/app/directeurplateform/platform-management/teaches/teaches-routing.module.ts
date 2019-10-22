import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeachesComponent } from './teaches.component';

const routes: Routes = [
  {
    path:'',
    component:TeachesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachesRoutingModule { }
