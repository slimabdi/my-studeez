import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirecteurRoutingModule } from './directeurplateform-routing.module';
import { DirecteurComponent } from './directeurplateform.component';
import { NavSidebarComponent } from './nav-sidebar/nav-sidebar.component';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { SidebarModule } from 'ng-sidebar';
import {ExelDownloadService} from '../services/exel-download.service';
@NgModule({

  imports: [
    CommonModule,
    DirecteurRoutingModule,
    BsDatepickerModule.forRoot(),
    SidebarModule.forRoot(),
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [DirecteurComponent,NavSidebarComponent],
  providers:[
    ExelDownloadService,
  ]
})
export class DirecteurplatformModule { }
