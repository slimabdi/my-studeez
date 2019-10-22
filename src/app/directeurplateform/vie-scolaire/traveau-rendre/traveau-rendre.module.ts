import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TraveauRendreRoutingModule } from './traveau-rendre-routing.module';
import { TraveauRendreComponent } from './traveau-rendre.component';
import {DataTableModule} from 'angular2-datatable';
import { PaginationModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap';
import { SidebarModule } from 'ng-sidebar';
import { SlideToggleModule } from 'ngx-slide-toggle';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { QuillModule } from 'ngx-quill'

@NgModule({
  imports: [
    CommonModule,
    TraveauRendreRoutingModule,
    DataTableModule,
    PaginationModule.forRoot(),
    SidebarModule.forRoot(),
    SlideToggleModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    QuillModule
  ],
  declarations: [TraveauRendreComponent]
})
export class TraveauRendreModule { }
