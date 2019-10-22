import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalerieComponent } from './galerie.component';

const routes: Routes = [{
  path:'',
  component: GalerieComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalerieRoutingModule { }
