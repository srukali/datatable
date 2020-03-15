import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CdkDragStart, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
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
  columns: any[] = [
    { field: 'id' },
    { field: 'employee_name' },
    { field: 'employee_salary' },
    { field: 'employee_age' }
  ];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource();
  previousIndex: number;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.setDisplayedColumns();
    this.dataSource.sort = this.sort;

    this.apiService.getEmployees()
      .subscribe((data) => {
        this.dataSource.data = data.data;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setDisplayedColumns() {
    this.columns.forEach(( column, index) => {
      column.index = index;
      this.displayedColumns[index] = column.field;
    });
  }

  dragStarted(event: CdkDragStart, index: number ) {
    this.previousIndex = index;
  }

  dropListDropped(event: CdkDropList, index: number) {
    if (event) {
      moveItemInArray(this.columns, this.previousIndex, index);
      this.setDisplayedColumns();
    }
  }
}
