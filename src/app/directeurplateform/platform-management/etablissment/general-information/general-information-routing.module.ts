import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralInformationComponent } from './general-information.component';

const routes: Routes = [
  {
    path:'',
    component:GeneralInformationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralInformationRoutingModule { }
