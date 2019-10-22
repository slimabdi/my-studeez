import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsComponent } from './documents.component';

@NgModule({
  imports: [
    CommonModule,
    DocumentsRoutingModule
  ],
  declarations: [DocumentsComponent]
})
export class DocumentsModule { }
