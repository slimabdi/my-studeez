import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatieresComponent } from './matieres.component'

const routes: Routes = [{
  path:'',
  component:MatieresComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatieresRoutingModule { }
