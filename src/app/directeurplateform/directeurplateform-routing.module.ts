import { NgModule } from '@angular/core';
import { Routes, RouterModule, ChildActivationEnd } from '@angular/router';
import { DirecteurComponent } from './directeurplateform.component';
import {AuthGuardGroup} from '../auth.guard.groups'

const routes: Routes = [{
  path:'',
  component:DirecteurComponent,
  canActivate:[AuthGuardGroup],
  children:[
    {
      path:'administration',
      loadChildren:'./administration/administration.module#AdministrationModule'
    },
    {
      path:'platform-management',
      loadChildren:'./platform-management/platform-management.module#PlatformManagementModule'
    },
    {
      path:'scholar-life',
      loadChildren:'./vie-scolaire/vie-scolaire.module#VieScolaireModule'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirecteurRoutingModule { }
