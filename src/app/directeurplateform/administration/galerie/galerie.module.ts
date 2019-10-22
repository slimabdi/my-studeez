import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalerieRoutingModule } from './galerie-routing.module';
import { GalerieComponent } from './galerie.component';
import {DataTableModule} from 'angular2-datatable';
import { NgxGaugeModule } from 'ngx-gauge';
import { SlideToggleModule } from 'ngx-slide-toggle';
import { PaginationModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SidebarModule } from 'ng-sidebar';
import {FormsModule} from "@angular/forms";
import { SidebargalerieComponent } from './sidebargalerie/sidebargalerie.component';
import {GaleriePipe2} from "../../../filters/galerie.pipe";
import {ShowErrorssuperGalerieComponent} from "../../../show-errors.component";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  imports: [
    CommonModule,
    GalerieRoutingModule,
    DataTableModule,
    NgxGaugeModule,
    PaginationModule.forRoot(),
    SlideToggleModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    SidebarModule.forRoot(),
    ToastrModule.forRoot(), // ToastrModule added


  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],

  declarations: [GalerieComponent, SidebargalerieComponent,GaleriePipe2,ShowErrorssuperGalerieComponent]
})
export class GalerieModule { }
