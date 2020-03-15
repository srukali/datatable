import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sortBy', pure: false })
export class MultiSortPipe implements PipeTransform {

  transform(data: Array<any>, sortByParams: Array<any>): Array<any> {
    const fieldSorter = (fields) => (a, b) => fields.map(o => {
      let dir = 1;
      if (o[0] === '-') { dir = -1; o = o.substring(1); }
      return a[o] > b[o] ? dir : a[o] < b[o] ? -(dir) : 0;
    }).reduce((p, n) => p ? p : n, 0);

    return data.sort(fieldSorter(sortByParams));
  }
}
