import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesDirecteurComponent } from './classes-directeur.component';

@NgModule({
  imports: [
    CommonModule,
    ClassesRoutingModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],  
  declarations: [ClassesDirecteurComponent]
})
export class ClassesDirecteurModule { }
