import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';
import { SidebarnotesComponent } from './sidebarnotes/sidebarnotes.component';
import { SidebarModule } from 'ng-sidebar';
import { BsDropdownModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';




@NgModule({
  imports: [
    CommonModule,
    NotesRoutingModule,
    SidebarModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),


  ],
  declarations: [NotesComponent, SidebarnotesComponent]
})
export class NotesModule { }
