import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsAndGroupingRoutingModule } from './groups-and-grouping-routing.module';
import { GroupsAndGroupingComponent } from './groups-and-grouping.component';


import {DataTableModule} from 'angular2-datatable';
import { NgxGaugeModule } from 'ngx-gauge';
import { SlideToggleModule } from 'ngx-slide-toggle';
import { PaginationModule } from 'ngx-bootstrap';
import { SidebarModule } from 'ng-sidebar';
import { SidebargroupementComponent } from './sidebargroupement/sidebargroupement.component';
import { ModalModule } from 'ngx-bootstrap';
import { NgxInputFileUploadModule } from 'ngx-input-file-upload';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import {FormsModule} from "@angular/forms";

import { SidebarRegroupingComponent } from './sidebar-regrouping/sidebar-regrouping.component'
import { GroupeAndRegroupingService } from "../../../services/groupe-and-regrouping.service"
import { ClickOutsideModule } from 'ng4-click-outside';
import {LoaderComponent } from '../../loader/loader.component'
import {NothingtoshowComponent } from '../../nothingtoshow/nothingtoshow.component'
import {DataFilterPipe} from './datafilterpipe'
 @NgModule({
  imports: [
    FormsModule,
    CommonModule,
    GroupsAndGroupingRoutingModule,
    DataTableModule,
    ClickOutsideModule,
    NgxGaugeModule,
    PaginationModule.forRoot(),
    SlideToggleModule,
    SidebarModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    NgxInputFileUploadModule,
    BsDropdownModule.forRoot()
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers:[GroupeAndRegroupingService] ,
  declarations: [GroupsAndGroupingComponent,SidebargroupementComponent,SidebarRegroupingComponent,LoaderComponent,NothingtoshowComponent,DataFilterPipe]
})
export class GroupsAndGroupingModule { }
