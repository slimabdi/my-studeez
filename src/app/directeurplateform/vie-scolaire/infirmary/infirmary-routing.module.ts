import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfirmaryComponent } from './infirmary.component';
import { FormsModule }   from '@angular/forms';

export const routes: Routes = [{
  
  path:'',
  component:InfirmaryComponent,
  children:[
    {
      path:'',
      loadChildren:'./passage-en-infirmerie/passage-en-infirmerie.module#PassageEnInfirmerieModule'

    },

    {
      path:'carnet',
      loadChildren:'./carnetsante/carnetsante.module#CarnetsanteModule'

    },

  ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes),
    FormsModule,
  ],
  exports: [RouterModule,FormsModule],
  
})
export class InfirmaryRoutingModule { }
