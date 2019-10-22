import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterGroupe'
})
export class FilterGroupePipe implements PipeTransform {


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
