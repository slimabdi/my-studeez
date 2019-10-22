import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataTableModule} from "angular2-datatable";
import { GroupeScolairesComponent } from './groupe-scolaires.component'
import { GroupeScolairesRoutingModule } from './groupe-scolaires-routing.module';
import { FilterGroupePipe } from '../../filters/filter-groupe.pipe';
import {ColorPickerModule} from "ngx-color-picker";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GroupeScolairesRoutingModule,
    DataTableModule,
    ColorPickerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] ,
  declarations: [GroupeScolairesComponent,FilterGroupePipe]
})
export class GroupeScolairesModule { }
