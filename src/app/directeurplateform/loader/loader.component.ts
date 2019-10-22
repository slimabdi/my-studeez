import { Component, OnInit,Input } from '@angular/core';
import {ElevesPipe} from "../../filters/eleves.pipe";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() dark: any = false
  @Input() word: any = ''

  constructor() { }

  ngOnInit() {
  }

}
export class LoaderComponentGalerie extends LoaderComponent {}
export class LoaderComponentCalendar extends LoaderComponent {}
