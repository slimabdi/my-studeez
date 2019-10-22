import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresentationRoutingModule } from './presentation-routing.module';
import { PresentationComponent } from './presentation.component';
import { NgxInputFileUploadModule } from 'ngx-input-file-upload';
import { ColorPickerModule } from 'ngx-color-picker';
import {ToastrModule} from "ngx-toastr";
import {FormsModule} from "@angular/forms";
import { TimepickerModule } from 'ngx-bootstrap';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PresentationRoutingModule,
    NgxInputFileUploadModule,
    ColorPickerModule,
    ToastrModule.forRoot(),
    TimepickerModule.forRoot()
// ToastrModule added
  ],
  declarations: [PresentationComponent]
})
export class PresentationModule { }
