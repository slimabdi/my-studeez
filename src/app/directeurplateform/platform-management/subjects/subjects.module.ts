import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectsRoutingModule } from './subjects-routing.module';
import { SubjectsComponent } from './subjects.component';
import {DataTableModule} from 'angular2-datatable';
import { NgxGaugeModule } from 'ngx-gauge';
import { SlideToggleModule } from 'ngx-slide-toggle';
import { PaginationModule } from 'ngx-bootstrap';
import {SidebarSubjectComponent} from "./sidebarSubject/sidebarSubject.component";
import {FormsModule} from "@angular/forms";
import {SidebarModule} from "ng-sidebar";
import {MatieresPipe2} from "../../../filters/matieres.pipe";
import {ShowErrorsSidebarSubjectComponent} from "../../../show-errors.component";
import { ToastrModule } from 'ngx-toastr';
import {NgxInputFileUploadModule} from "ngx-input-file-upload";

@NgModule({
  imports: [

    SlideToggleModule,
    CommonModule,
    SubjectsRoutingModule,
    DataTableModule,
    NgxGaugeModule,
    PaginationModule.forRoot(),
    DataTableModule,
    SlideToggleModule,
    NgxGaugeModule,
    FormsModule,
    SidebarModule.forRoot(),
    NgxInputFileUploadModule,
    ToastrModule.forRoot(), // ToastrModule added


  ],
  declarations: [SubjectsComponent,SidebarSubjectComponent,MatieresPipe2,ShowErrorsSidebarSubjectComponent]
})
export class SubjectsModule { }
