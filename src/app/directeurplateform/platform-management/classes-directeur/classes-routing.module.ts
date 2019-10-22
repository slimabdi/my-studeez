import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassesDirecteurComponent } from './classes-directeur.component';

const routes: Routes = [
  {
    path:'',
    component:ClassesDirecteurComponent,
    children:[
      {
        path:'scolar-class',
        loadChildren:'./scolar-classes/scolar-classes.module#ScolarClassesModule'
      },
      {
        path:'scolar-level',
        loadChildren:'./scolar-level/scolar-level.module#ScolarLevelModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }
