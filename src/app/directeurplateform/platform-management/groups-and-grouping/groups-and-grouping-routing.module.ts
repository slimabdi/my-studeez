import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsAndGroupingComponent } from './groups-and-grouping.component';

const routes: Routes = [
  {
    path:'',
    component:GroupsAndGroupingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsAndGroupingRoutingModule { }
