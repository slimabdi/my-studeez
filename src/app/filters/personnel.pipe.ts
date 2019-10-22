import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'personnelName'
})
  export class PersonnelNamePipe implements PipeTransform{

    transform(value: any, term: string): any {
      if (term == null) {
        return value;
      }
      return value.filter (hero => (((hero.nom?hero.nom:'')).toLowerCase()).includes(term.toLowerCase()));
    }

  }
  export class PersonnelNamePipe2 extends PersonnelNamePipe {}
