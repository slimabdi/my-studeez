import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScolarLevelRoutingModule } from './scolar-level-routing.module';
import { ScolarLevelComponent } from './scolar-level.component';
import { SidebarlevelsComponent } from './sidebarlevels/sidebarlevels.component';

import {DataTableModule} from 'angular2-datatable';
import { NgxGaugeModule } from 'ngx-gauge';
import { SlideToggleModule } from 'ngx-slide-toggle';
import { PaginationModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SidebarModule } from 'ng-sidebar';
import { NgxInputFileUploadModule } from 'ngx-input-file-upload';
import {DndModule} from 'ng2-dnd';
import { ToastrModule } from 'ngx-toastr';
import {FormsModule} from "@angular/forms";
// Ng2-select
import { SelectModule } from 'ng-select';
import { DataFilterPipe } from './datafilterpipe';

@NgModule({
  imports: [
    CommonModule,
    ScolarLevelRoutingModule,
    FormsModule,
    DndModule.forRoot(),
    DataTableModule,
    NgxGaugeModule,
    PaginationModule.forRoot(),
    DataTableModule,
    SlideToggleModule,
    BsDatepickerModule.forRoot(),
    SidebarModule.forRoot(),
    ToastrModule.forRoot(),
    NgxInputFileUploadModule,
    SelectModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ScolarLevelComponent, SidebarlevelsComponent,DataFilterPipe]
})
export class ScolarLevelModule { }
