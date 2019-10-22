import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServerInfoComponent } from './server-info.component';

const routes: Routes = [
  {
    path:'',
    component:ServerInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServerInfoRoutingModule { }
