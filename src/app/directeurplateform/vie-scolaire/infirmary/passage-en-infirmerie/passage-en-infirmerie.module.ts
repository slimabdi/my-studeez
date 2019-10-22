import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';
import {PassageEnInfirmerieComponent } from './passage-en-infirmerie.component';
import { Routes, RouterModule } from '@angular/router';
import { SidebarModule } from 'ng-sidebar';
import {FormsModule} from "@angular/forms";
import {SidebarinfirmaryComponent} from './sidebarinfirmary/sidebarinfirmary.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { PaginationModule ,ModalModule } from 'ngx-bootstrap';
import {NgbModule,} from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
const routes: Routes = [{
  path:'',
  component:PassageEnInfirmerieComponent,
  children:[
    {
      path:'ajoutercarnet',
      loadChildren:'../carnetsante/sidebar-carnet-sante/sidebar-carnet-sante.module#CarnetlisteModule'

    },
    
  ]

}];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SidebarModule.forRoot(),
    FormsModule,
    AmazingTimePickerModule,
    PaginationModule.forRoot(),
    NgbModule.forRoot(),
    NgbModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  declarations: [PassageEnInfirmerieComponent,SidebarinfirmaryComponent],
  entryComponents: [PassageEnInfirmerieComponent],
})
export class PassageEnInfirmerieModule { }
