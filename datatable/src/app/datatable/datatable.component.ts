import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort} from '@angular/material/sort';

import { ApiService } from '../shared/api.service';

@Component({
  selector    : 'app-datatable',
  templateUrl : './datatable.component.html',
  styleUrls   : ['./datatable.component.scss']
})

export class DatatableComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  // I wouldn't typically name variables in snake case, this is how my mock API sends them :)
  displayedColumns: string[] = ['id', 'employee_name', 'employee_salary', 'employee_age'];
  dataSource = new MatTableDataSource();
  sortByParams = [];
  asc = false;

  ngOnInit() {
    // this.dataSource.sort = this.sort;

    this.apiService.getEmployees()
      .subscribe((data) => {
        this.dataSource.data = data.data;
        console.log('data', data);
        this.dataSource.data = this.sortByMultipleRows(data.data, ['id']);
      });
  }

  /**
   * Search/Filter a dataset
   * @param event - keyup
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sort(column) {
    const asc = this.sortByParams.indexOf(column);
    const desc = this.sortByParams.indexOf(`-${column}`);

    if (asc === -1 && desc === -1) {
      this.sortByParams.push(column);
    } else {
      if (asc !== -1) {
        this.sortByParams.splice(this.sortByParams.indexOf(column), 1, `-${column}`);
      } else {
        this.sortByParams.splice(this.sortByParams.indexOf(`-${column}`), 1, column);
      }
    }
    console.log(this.sortByParams);
    this.dataSource.data = this.sortByMultipleRows(this.dataSource.data, this.sortByParams);
  }

  removeSort(column) {
    if (this.sortByParams.indexOf(column) !== -1) {
      this.sortByParams.splice(this.sortByParams.indexOf(column), 1);
      console.log(this.sortByParams);
      this.dataSource.data = this.sortByMultipleRows(this.dataSource.data, this.sortByParams);
    }
  }

  /**
   * Sorts a dataset based on multiple columns
   * @param data - Dataset to sort
   * @param sortByParams - Array of columns to sort in order of importance.
   *  Use notation '-id' to indicate descending
   */
  sortByMultipleRows(data, sortByParams) {
    console.log('sorting multiple rows');
    const fieldSorter = (fields) => (a, b) => fields.map(o => {
      let dir = 1;
      if (o[0] === '-') { dir = -1; o = o.substring(1); }
      return a[o] > b[o] ? dir : a[o] < b[o] ? -(dir) : 0;
    }).reduce((p, n) => p ? p : n, 0);

    return data.sort(fieldSorter(sortByParams));
  }

  /**
   * Re-order the columns in the datatable
   * @param event - drop the table in its new location
   */
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }
}
