import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpGalerieComponent } from './up-galerie.component';

const routes: Routes = [
  {
    path:'',
    component: UpGalerieComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpGalerieRoutingModule { }
