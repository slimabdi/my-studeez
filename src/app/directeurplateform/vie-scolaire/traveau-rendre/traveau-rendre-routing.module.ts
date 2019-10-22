import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TraveauRendreComponent } from './traveau-rendre.component';

const routes: Routes = [{
  path:'',
  component:TraveauRendreComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraveauRendreRoutingModule { }
