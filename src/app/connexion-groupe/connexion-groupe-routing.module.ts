import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnexionGroupeComponent } from './connexion-groupe.component'
const routes: Routes = [{
  path:'',
  component:ConnexionGroupeComponent

}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnexionGroupeRoutingModule { }
