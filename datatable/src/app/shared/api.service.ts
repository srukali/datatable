import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiService {

  baseUrl = 'http://dummy.restapiexample.com/api/v1';

  constructor(private httpService: HttpClient) {}

  public getEmployees(): Observable<any> {
    return this.httpService
      .get(`${this.baseUrl}/employees`)
      .pipe(
        map((result: object) => {
          return result;
        })
      );
  }

}
