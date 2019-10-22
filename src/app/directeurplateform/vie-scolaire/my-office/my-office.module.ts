import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyOfficeRoutingModule } from './my-office-routing.module';
import { MyOfficeComponent } from './my-office.component';

@NgModule({
  imports: [
    CommonModule,
    MyOfficeRoutingModule
  ],
  declarations: [MyOfficeComponent]
})
export class MyOfficeModule { }
