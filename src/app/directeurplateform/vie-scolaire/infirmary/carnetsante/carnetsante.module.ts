import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarnetsanteComponent} from './carnetsante.component';
import {CarnetlisteComponent } from './carnetliste/carnetliste.component';
import { Routes , RouterModule} from '@angular/router';
 import { CarnetlisteModule} from './carnetliste/carnetliste.module';
 import { SidebarModule } from 'ng-sidebar';
 import { SidebarCarnetSanteComponent } from './sidebar-carnet-sante/sidebar-carnet-sante.component';
 import {InfirmaryModule} from '../infirmary.module';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import {GroupeAndRegroupingService} from '../../../../services/groupe-and-regrouping.service'

const routes: Routes = [{
  path:'',
  component:CarnetsanteComponent,
  children:[
    {
      path:'listcarnet',
      loadChildren:'./carnetliste/carnetliste.module#CarnetlisteModule'

    },
    
  ]
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SidebarModule.forRoot(),
    FormsModule   
  ],
  declarations: [CarnetsanteComponent ,SidebarCarnetSanteComponent],
})
export class CarnetsanteModule { }
