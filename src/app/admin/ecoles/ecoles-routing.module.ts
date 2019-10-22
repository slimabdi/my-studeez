import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EcolesComponent} from "../ecoles/ecoles.component";

const routes: Routes = [{
  path: '',
  component: EcolesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcolesRoutingModule { }
