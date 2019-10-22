import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'galerie'
})
export class GaleriePipe implements PipeTransform {


  transform(value: any, term: any): any {

    if (term == null) {
      return value;
    }
    term = term.toLowerCase();

    return value.filter(function(item){
      return JSON.stringify(item).toLowerCase().includes(term);


    });
  }

}
export class GaleriePipe2 extends GaleriePipe {}
