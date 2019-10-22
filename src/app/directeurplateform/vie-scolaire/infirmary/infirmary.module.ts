import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {GroupeAndRegroupingService} from '../../../services/groupe-and-regrouping.service'
import { InfirmaryRoutingModule } from './infirmary-routing.module';
import { InfirmaryComponent } from './infirmary.component';
import { SidebarModule } from 'ng-sidebar';
import { HttpModule } from '@angular/http';
import {DataTableModule} from 'angular2-datatable';
import { PaginationModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import {FormsModule} from "@angular/forms";
 import {CarnetsanteModule} from './carnetsante/carnetsante.module'

@NgModule({
  imports: [
    CommonModule,
    InfirmaryRoutingModule,
    SidebarModule.forRoot(),
    DataTableModule,
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    HttpModule,FormsModule,
    AmazingTimePickerModule,
    CarnetsanteModule,
  ],
  providers : [GroupeAndRegroupingService],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [InfirmaryComponent, ],

})
export class InfirmaryModule {
  
 }
