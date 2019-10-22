import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'enseignantName'
})
  export class EnseignantPipe implements PipeTransform{

    transform(value: any, term: string): any {
      if (term == null) {
        return value;
      }
      return value.filter (hero => (hero.nom?hero.nom:'').includes(term));
    }

  }
