import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarnetlisteComponent } from './carnetliste.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{
  path:'',
  component:CarnetlisteComponent,

}];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
   
  ],
  declarations: [CarnetlisteComponent]
})

export class CarnetlisteModule { }
