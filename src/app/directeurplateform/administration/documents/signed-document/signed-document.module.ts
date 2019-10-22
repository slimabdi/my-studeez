import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignedDocumentRoutingModule } from './signed-document-routing.module';
import { SignedDocumentComponent } from './signed-document.component';

@NgModule({
  imports: [
    CommonModule,
    SignedDocumentRoutingModule
  ],
  declarations: [SignedDocumentComponent]
})
export class SignedDocumentModule { }
