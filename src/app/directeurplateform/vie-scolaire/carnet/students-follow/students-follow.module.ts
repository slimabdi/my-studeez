import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsFollowRoutingModule } from './students-follow-routing.module';
import { StudentsFollowComponent } from './students-follow.component';

@NgModule({
  imports: [
    CommonModule,
    StudentsFollowRoutingModule
  ],
  declarations: [StudentsFollowComponent]
})
export class StudentsFollowModule { }
