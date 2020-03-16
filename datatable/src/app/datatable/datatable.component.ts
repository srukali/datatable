import { Component, OnInit} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { componentDestroyed, OnDestroyMixin } from '@w11k/ngx-componentdestroyed';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material/table';

import { ApiService } from '../shared/api.service';

@Component({
  selector    : 'app-datatable',
  templateUrl : './datatable.component.html',
  styleUrls   : ['./datatable.component.scss']
})

export class DatatableComponent extends OnDestroyMixin implements OnInit {
  constructor(private apiService: ApiService) {
    super();
  }

  // I wouldn't typically name variables in snake case, this is how my mock API sends them :)
  displayedColumns: string[] = ['id', 'employee_name', 'employee_salary', 'employee_age'];
  dataSource = new MatTableDataSource();
  sortByParams = [];

  ngOnInit() {
    this.apiService.getEmployees()
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe((data) => {
        // Map API strings to numbers so sorting works correctly
        data.data.map((employee) => {
          employee.id = Number(employee.id);
          employee.employee_age = Number(employee.employee_age);
          return;
        });

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

  /**
   * Sort between ASC or DESC
   * @param column - Datatable column to sort
   */
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

  /**
   * Clear any sorting
   * @param column - Datatable column to clear sorting
   */
  removeSort(column) {
    const asc = this.sortByParams.indexOf(column);

    if (asc !== -1) {
      this.sortByParams.splice(this.sortByParams.indexOf(column), 1);
    } else {
      this.sortByParams.splice(this.sortByParams.indexOf(`-${column}`), 1);
    }

    this.dataSource.data = this.sortByMultipleRows(this.dataSource.data, this.sortByParams);
  }

  /**
   * Sorts a dataset based on multiple columns
   * @param data - Dataset to sort
   * @param sortByParams - Array of columns to sort in order of importance.
   *  Use notation '-id' to indicate descending
   */
  sortByMultipleRows(data, sortByParams) {
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

  /**
   * Show/Hide the Clear button for Sorting
   * @param column - Column to hide/show Sort Clear button
   */
  showClearButton(column) {
    return this.sortByParams.includes(column) || this.sortByParams.includes(`-${column}`);
  }

  /**
   * Decides which icon to display for sorting each column (Asc, Desc, Neutral)
   * TODO: This is not the most efficient way to do this. Ideally you would
   * TODO: an object you could hash and set in the actual sorting methods
   * @param column - Column which the icon pertains to
   */
  displaySortingIcon(column) {
    if (this.sortByParams.length === 0) {
      return 'sort';
    }

    const asc = this.sortByParams.indexOf(column);
    const desc = this.sortByParams.indexOf(`-${column}`);

    if (asc !== -1) {
      return 'keyboard_arrow_up';
    }

    if (desc !== -1) {
      return 'keyboard_arrow_down';
    }

    return 'sort';
  }
}
