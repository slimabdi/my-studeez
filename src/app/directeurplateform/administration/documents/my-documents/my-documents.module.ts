import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyDocumentsRoutingModule } from './my-documents-routing.module';
import { MyDocumentsComponent } from './my-documents.component';

@NgModule({
  imports: [
    CommonModule,
    MyDocumentsRoutingModule
  ],
  declarations: [MyDocumentsComponent]
})
export class MyDocumentsModule { }
