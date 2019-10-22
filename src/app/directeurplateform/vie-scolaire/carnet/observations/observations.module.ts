import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObservationsRoutingModule } from './observations-routing.module';
import { ObservationsComponent } from './observations.component';

@NgModule({
  imports: [
    CommonModule,
    ObservationsRoutingModule
  ],
  declarations: [ObservationsComponent]
})
export class ObservationsModule { }
