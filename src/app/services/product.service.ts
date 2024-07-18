import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment.bassic';
import { productsDtos, singleProductDto } from '../model/product.model';
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

  getById(id: number): Observable<singleResponse<singleProductDto>> {
    return this.http.get<singleResponse<singleProductDto>>(
      `${environment.api}/Product/single-product-${id}`
    );
  }
}
