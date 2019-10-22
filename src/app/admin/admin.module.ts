import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomeRoutingModule } from './admin-routing.module';
import {DataTableModule} from "angular2-datatable";
import {ColorPickerModule} from "ngx-color-picker";
//components
import {SidebarComponent} from "./sidebar/sidebar.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {AuthService} from "../services/auth.service";
import {GroupeScolaireService} from "../services/groupe-scolaire.service";
import {AdminComponent} from './admin.component'

import {ExelDownloadService} from '../services/exel-download.service'
import {Globals} from "../models/globals";
import {ChartsModule} from "ng2-charts";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    DataTableModule,
    ReactiveFormsModule,
    ChartsModule,
    ColorPickerModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AdminComponent,
    NavbarComponent,
    SidebarComponent

  ],

  providers:[
    AuthService,
    GroupeScolaireService,
    ExelDownloadService,
    [Globals]
  ]
})
export class AdminModule { }
