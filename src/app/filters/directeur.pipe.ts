import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'DirecteurName'
})
export class DirecteurNamePipe implements PipeTransform{

  transform(value: any, term: string): any {
    if (term == null) {
      return value;
    }
    return value.filter (hero => (hero.nom?hero.nom:'').includes(term));
  }

}
export class DirecteurNamePipe2 extends DirecteurNamePipe {}
