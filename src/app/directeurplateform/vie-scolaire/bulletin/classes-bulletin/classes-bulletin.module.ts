import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesBulletinRoutingModule } from './classes-bulletin-routing.module';
import { ClassesBulletinComponent } from './classes-bulletin.component';

@NgModule({
  imports: [
    CommonModule,
    ClassesBulletinRoutingModule
  ],
  declarations: [ClassesBulletinComponent]
})
export class ClassesBulletinModule { }
