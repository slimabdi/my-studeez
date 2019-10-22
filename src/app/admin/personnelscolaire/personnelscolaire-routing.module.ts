import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonnelscolaireComponent } from './personnelscolaire.component'

const routes: Routes = [
  {
    path:'',
    component:PersonnelscolaireComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnelscolaireRoutingModule { }
