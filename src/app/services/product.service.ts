import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment.bassic';
import { productsDtos } from '../model/product.model';
import { singleResponse } from '../model/response.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getData(page: string): Observable<singleResponse<productsDtos[]>> {
    return this.http.get<singleResponse<productsDtos[]>>(
      `${environment.api}/Product/page-${page}`
    );
  }
}
