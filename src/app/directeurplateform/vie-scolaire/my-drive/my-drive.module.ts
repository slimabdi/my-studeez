import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyDriveRoutingModule } from './my-drive-routing.module';
import { MyDriveComponent } from './my-drive.component';

@NgModule({
  imports: [
    CommonModule,
    MyDriveRoutingModule
  ],
  declarations: [MyDriveComponent]
})
export class MyDriveModule { }
