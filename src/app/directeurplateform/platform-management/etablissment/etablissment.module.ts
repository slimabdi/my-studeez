import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtablissmentComponent } from './etablissment.component';
import { EtablissmentRoutingModule } from './etablissment-routing.module';
import {ButtonsModule, PaginationModule} from 'ngx-bootstrap';
import {DataTableModule} from "angular2-datatable";
import {NgxGaugeModule} from "ngx-gauge";
import {SlideToggleModule} from "ngx-slide-toggle";
import {SidebarModule} from "ng-sidebar";
import {NgxInputFileUploadModule} from "ngx-input-file-upload";
import {FormsModule} from "@angular/forms";



@NgModule({
  imports: [
    CommonModule,
    EtablissmentRoutingModule,
    ButtonsModule.forRoot(),
     DataTableModule,
    NgxGaugeModule,
    PaginationModule.forRoot(),
    SlideToggleModule,
    SidebarModule.forRoot(),
    NgxInputFileUploadModule,
    FormsModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [EtablissmentComponent]
})
export class EtablissmentModule { }
