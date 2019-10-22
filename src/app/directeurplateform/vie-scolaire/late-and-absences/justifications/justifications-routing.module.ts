import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JustificationsComponent } from './justifications.component';

const routes: Routes = [{
  path:'',
  component:JustificationsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JustificationsRoutingModule { }
