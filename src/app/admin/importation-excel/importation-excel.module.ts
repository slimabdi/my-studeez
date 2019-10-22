import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import  { ImportationExcelComponent } from './importation-excel.component'
import { ImportationExcelRoutingModule } from './importation-excel-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataTableModule} from "angular2-datatable";
import {ImportationExcelService} from "../../services/importation-excel.service"
// Ng2-select
import { SelectModule } from 'ng-select';
@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    SelectModule,
    FormsModule,
    ReactiveFormsModule,
    ImportationExcelRoutingModule,
  ],
  providers: [ImportationExcelService],
  declarations: [ImportationExcelComponent]
})
export class ImportationExcelModule { 

}
