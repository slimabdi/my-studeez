import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes , RouterModule} from '@angular/router';
import {SidebarCarnetSanteComponent } from './sidebar-carnet-sante.component'
const routes: Routes = [{
  path:'',
  component:SidebarCarnetSanteComponent,
}];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SidebarCarnetSanteComponent]
})
export class SidebarCarnetSanteModule { }
