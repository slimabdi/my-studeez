import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupeScolairesComponent } from './groupe-scolaires.component'

const routes: Routes = [ {
  path:'',
  component:GroupeScolairesComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupeScolairesRoutingModule { }
