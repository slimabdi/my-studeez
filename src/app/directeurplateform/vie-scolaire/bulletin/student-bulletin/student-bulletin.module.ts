import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentBulletinRoutingModule } from './student-bulletin-routing.module';
import { StudentBulletinComponent } from './student-bulletin.component';

@NgModule({
  imports: [
    CommonModule,
    StudentBulletinRoutingModule
  ],
  declarations: [StudentBulletinComponent]
})
export class StudentBulletinModule { }
