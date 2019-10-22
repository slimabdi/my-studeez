import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JustificationsRoutingModule } from './justifications-routing.module';
import { JustificationsComponent } from './justifications.component';
import { SibebarjustificationComponent } from './sibebarjustification/sibebarjustification.component';
import {DataTableModule} from 'angular2-datatable';
import { PaginationModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap';
import { SidebarModule } from 'ng-sidebar';
import { SlideToggleModule } from 'ngx-slide-toggle';


@NgModule({
  imports: [
    CommonModule,
    JustificationsRoutingModule,
    DataTableModule,
    PaginationModule.forRoot(),
    SidebarModule.forRoot(),
    SlideToggleModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [JustificationsComponent, SibebarjustificationComponent]
})
export class JustificationsModule { }
