import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallsInClassroomComponent } from './calls-in-classroom.component';

const routes: Routes = [{
  path:'',
  component:CallsInClassroomComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallsInClassroomRoutingModule { }
