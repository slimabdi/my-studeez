import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import  { ImportationExcelComponent } from './importation-excel.component'

const routes: Routes = [{
  path:'',
  component:ImportationExcelComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportationExcelRoutingModule { }
