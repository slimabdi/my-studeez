import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServerInfoRoutingModule } from './server-info-routing.module';
import { ServerInfoComponent } from './server-info.component';
import {ToastrModule} from "ngx-toastr";
import {FormsModule} from "@angular/forms";
import {NgxInputFileUploadModule} from "ngx-input-file-upload";


@NgModule({
  imports: [
    CommonModule,
    ToastrModule.forRoot(), // ToastrModule added
    FormsModule,
    ServerInfoRoutingModule,
    NgxInputFileUploadModule,

  ],
  declarations: [ServerInfoComponent]
})
export class ServerInfoModule { }
