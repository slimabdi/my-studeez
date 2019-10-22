import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ElevesComponent} from "./eleves.component";

const routes: Routes = [{
  path:'',
  component:ElevesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElevesRoutingModule { }
