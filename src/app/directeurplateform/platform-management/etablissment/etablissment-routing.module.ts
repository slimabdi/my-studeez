import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EtablissmentComponent } from './etablissment.component';

const routes: Routes = [
  {
    path:'',
    component:EtablissmentComponent,
    children:[
      {
        path:'general-info',
        loadChildren:'./general-information/general-information.module#GeneralInformationModule'
      },
      {
        path:'periodes',
        loadChildren:'./periodes/periodes.module#PeriodesModule'
      },
      {
        path:'presentation',
        loadChildren:'./presentation/presentation.module#PresentationModule'
      },
      {
        path:'server-info',
        loadChildren:'./server-info/server-info.module#ServerInfoModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtablissmentRoutingModule { }
