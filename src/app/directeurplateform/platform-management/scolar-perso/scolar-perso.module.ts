import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScolarPersoRoutingModule } from './scolar-perso-routing.module';
import { ScolarPersoComponent } from './scolar-perso.component';
import {DataTableModule} from 'angular2-datatable';
import { NgxGaugeModule } from 'ngx-gauge';
import { SlideToggleModule } from 'ngx-slide-toggle';
import { PaginationModule } from 'ngx-bootstrap';
import {PersonnelNamePipe2} from "../../../filters/personnel.pipe";
import {FormsModule} from "@angular/forms";
import { SidebarpersonnelscolaireComponent } from './sidebarpersonnelscolaire/sidebarpersonnelscolaire.component';
import { SidebarModule } from 'ng-sidebar';
import { NgxInputFileUploadModule } from 'ngx-input-file-upload';

import { ShowErrorsComponentpersonnel2 } from '../../../show-errors.component';
@NgModule({
  imports: [
    CommonModule,
    ScolarPersoRoutingModule,
    DataTableModule,
    NgxGaugeModule,
    PaginationModule.forRoot(),
    DataTableModule,
    SlideToggleModule,
    FormsModule,
    SidebarModule.forRoot(),
    NgxInputFileUploadModule,

  ],
  declarations: [ScolarPersoComponent,PersonnelNamePipe2,SidebarpersonnelscolaireComponent, ShowErrorsComponentpersonnel2]
})
export class ScolarPersoModule { }
