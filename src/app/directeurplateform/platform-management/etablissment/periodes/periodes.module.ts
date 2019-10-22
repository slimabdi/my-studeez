import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeriodesRoutingModule } from './periodes-routing.module';
import { PeriodesComponent } from './periodes.component';
import {BsDatepickerModule, PaginationModule} from 'ngx-bootstrap';
import {FormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {SidebarModule} from "ng-sidebar";
import {SlideToggleModule} from "ngx-slide-toggle";
import {NgxGaugeModule} from "ngx-gauge";
import {DataTableModule} from "angular2-datatable";
import {DndModule} from "ng2-dnd";
import {NgxInputFileUploadModule} from "ngx-input-file-upload";
import {SelectModule} from "ng-select";
import { SidebarPeriodComponent } from './sidebarPeriod/sidebarPeriod.component';

@NgModule({
  imports: [
    CommonModule,
    PeriodesRoutingModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    ToastrModule.forRoot(),
    DndModule.forRoot(),
    DataTableModule,
    NgxGaugeModule,
    PaginationModule.forRoot(),
    SlideToggleModule,
    SidebarModule.forRoot(),
    NgxInputFileUploadModule,
    SelectModule

  ],
  declarations: [PeriodesComponent,SidebarPeriodComponent]
})
export class PeriodesModule { }
