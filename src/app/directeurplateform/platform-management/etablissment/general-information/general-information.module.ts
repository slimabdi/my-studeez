import {Input, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralInformationRoutingModule } from './general-information-routing.module';
import { GeneralInformationComponent } from './general-information.component';
import { ColorPickerModule } from 'ngx-color-picker';
import {FormsModule} from "@angular/forms";
import {Ecoles} from "../../../../modelsDirecteurPlateform/Ecoles.model";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../../services/auth.service";
import {EcoleService} from "../../../../services/ecole.service";
import {ToastrModule} from "ngx-toastr";
import {NgxInputFileUploadModule} from "ngx-input-file-upload";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GeneralInformationRoutingModule,
    ColorPickerModule,
    NgxInputFileUploadModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  declarations: [GeneralInformationComponent]
})



export class GeneralInformationModule {


}
