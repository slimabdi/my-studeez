import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpGalerieComponent } from './up-galerie.component';
import { SidebarupgalerieComponent } from './sidebarupgalerie/sidebarupgalerie.component';

import { UpGalerieRoutingModule } from './up-galerie-routing.module';
import {DataTableModule} from 'angular2-datatable';
import { NgxGaugeModule } from 'ngx-gauge';
import { SlideToggleModule } from 'ngx-slide-toggle';
import { PaginationModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SidebarModule } from 'ng-sidebar';
import {FormsModule} from "@angular/forms";
@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    NgxGaugeModule,
    PaginationModule.forRoot(),
    SlideToggleModule,
    BsDatepickerModule.forRoot(),
    SidebarModule.forRoot(),
    UpGalerieRoutingModule,
    FormsModule,
  ],

  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [UpGalerieComponent,SidebarupgalerieComponent]
})
export class UpGalerieModule { }
