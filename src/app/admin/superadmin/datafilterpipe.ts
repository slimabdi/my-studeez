import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row=>((' '+(row.nom||'')+' '+(row.prenom||'')+' '+(row.nombreEcole||'')+' '+(row.login||'')+' '+(row.tel1||'')).toLowerCase()).indexOf(query.toLowerCase()) > -1);
    }
    return array;
  }
}
