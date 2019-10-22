import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-nothingtoshow',
  templateUrl: './nothingtoshow.component.html',
  styleUrls: ['./nothingtoshow.component.scss']
})
export class NothingtoshowComponent implements OnInit {
  //nothing to show input text
  @Input() message:any=''

  constructor() { }

  ngOnInit() {
  }

}
