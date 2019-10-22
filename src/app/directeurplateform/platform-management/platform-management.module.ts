import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformManagementRoutingModule } from './platform-management-routing.module';


@NgModule({
  imports: [
    CommonModule,
    PlatformManagementRoutingModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: []
})
export class PlatformManagementModule { }
