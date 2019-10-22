import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationRoutingModule } from './administration-routing.module';
import { SidebarModule } from 'ng-sidebar';
import { PaginationModule } from 'ngx-bootstrap';
import {DataTableModule} from 'angular2-datatable';




@NgModule({
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    PaginationModule.forRoot(),
    DataTableModule,
    SidebarModule.forRoot()

  ],
  declarations: [ ]
})
export class AdministrationModule { }
