import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachesRoutingModule } from './teaches-routing.module';
import { TeachesComponent } from './teaches.component';
import {DataTableModule} from 'angular2-datatable';
import { NgxGaugeModule } from 'ngx-gauge';
import { SlideToggleModule } from 'ngx-slide-toggle';
import { PaginationModule } from 'ngx-bootstrap';
import { SidebarModule } from 'ng-sidebar';
import {SidebarteachesComponent} from './sidebarteaches/sidebarteaches.component'
import {FormsModule} from "@angular/forms";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxInputFileUploadModule } from 'ngx-input-file-upload';

@NgModule({
  imports: [
    CommonModule,
    TeachesRoutingModule,
    DataTableModule,
    NgxGaugeModule,
    PaginationModule.forRoot(),
    DataTableModule,
    SlideToggleModule,
    SidebarModule.forRoot(),
    FormsModule,
    BsDatepickerModule.forRoot(),
    NgxInputFileUploadModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [TeachesComponent,SidebarteachesComponent]
})
export class TeachesModule { }
