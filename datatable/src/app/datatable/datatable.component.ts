import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort} from '@angular/material/sort';

import { ApiService } from '../shared/api.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector    : 'app-datatable',
  templateUrl : './datatable.component.html',
  styleUrls   : ['./datatable.component.scss']
})

export class DatatableComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  displayedColumns: string[] = ['id', 'name', 'salary', 'age'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;

    this.apiService.getEmployees()
      .subscribe((data) => {
        console.log('data', data);
        this.dataSource.data = data.data;
        console.log('this.dataSource.data', this.dataSource.data);

      });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
