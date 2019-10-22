import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassBoardRoutingModule } from './class-board-routing.module';
import { ClassBoardComponent } from './class-board.component';

@NgModule({
  imports: [
    CommonModule,
    ClassBoardRoutingModule
  ],
  declarations: [ClassBoardComponent]
})
export class ClassBoardModule { }
