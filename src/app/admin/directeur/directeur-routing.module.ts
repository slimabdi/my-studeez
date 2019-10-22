import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirecteurComponent } from './directeur.component';

const routes: Routes = [{
  path:'',
  component:DirecteurComponent
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirecteurRoutingModule { }
