import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  constructor(
    private http: Http
  ) { }


  fetchOperators() {

    return this.http.get(`http://localhost:3000/operators`)
      .map((response: Response) => response);
  }

  fetchOperatorDetails(id) {
    return this.http.get(`http://localhost:3000/operators/${id}`)
      .map((response: Response) => response);
  }

  payment(params) {
    return this.http.patch(`http://localhost:3000/operators/${params.id}`, params)
      .map((response: Response) => response);

  }

}
