import { Component, OnInit, OnDestroy } from '@angular/core';

import { ApiService } from '../shared/api.service';

@Component({
  selector    : 'app-datatable',
  templateUrl : './datatable.component.html',
  styleUrls   : ['./datatable.component.scss']
})

export class DatatableComponent implements OnInit, OnDestroy {
  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.getEmployees()
      .subscribe((data: object) => {
        console.log('data', data);
      });
  }

  ngOnDestroy() {
    // Empty - destroy Observable subscribe
  }
}
