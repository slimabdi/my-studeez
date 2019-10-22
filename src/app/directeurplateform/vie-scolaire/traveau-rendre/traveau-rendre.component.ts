import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-traveau-rendre',
  templateUrl: './traveau-rendre.component.html',
  styleUrls: ['./traveau-rendre.component.css']
})
export class TraveauRendreComponent implements OnInit {
  contentArray = new Array(90).fill('');
  returnedArray: string[];
  rotate = true;
  maxSize = 5;

  constructor() { }

  ngOnInit():void  {
    this.contentArray = this.contentArray.map((v: string, i: number) => `Content line ${i + 1}`);
    this.returnedArray = this.contentArray.slice(0, 10);
  }
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.contentArray.slice(startItem, endItem);
  }

}
