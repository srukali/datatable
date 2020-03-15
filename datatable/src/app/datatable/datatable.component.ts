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
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;

    this.apiService.getEmployees()
      .subscribe((data) => {
        // this.dataSource.data = data.data;
        console.log('data', data);
        this.dataSource.data = this.sortByMultipleRows(data.data, ['employee_age', 'employee_name']);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortByMultipleRows(data, sortByParams) {

    const fieldSorter = (fields) => (a, b) => fields.map(o => {
      let dir = 1;
      if (o[0] === '-') { dir = -1; o = o.substring(1); }
      return a[o] > b[o] ? dir : a[o] < b[o] ? -(dir) : 0;
    }).reduce((p, n) => p ? p : n, 0);

    return data.sort(fieldSorter(sortByParams));
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }
}
