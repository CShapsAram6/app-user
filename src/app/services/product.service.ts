import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment.bassic';
import {
  IRelateToProductsDto,
  productsDtos,
  productsUsingShop,
  singleProductDto,
} from '../model/product.model';
import { singleResponse } from '../model/response.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) { }

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

  getUsingShop(page: number): Observable<singleResponse<productsUsingShop[]>> {
    return this.http.get<singleResponse<productsUsingShop[]>>(
      `${environment.api}/Product/shop-${page}`
    );
  }

  getByIdCategoryShop(
    id: number
  ): Observable<singleResponse<productsUsingShop[]>> {
    return this.http.get<singleResponse<productsUsingShop[]>>(
      `${environment.api}/Product/category-${id}`
    );
  }

  getRelateToProducts(
    id: number
  ): Observable<singleResponse<IRelateToProductsDto[]>> {
    return this.http.get<singleResponse<IRelateToProductsDto[]>>(
      `${environment.api}/Product/relate-to-${id}`
    );
  }

  getTopProducts(type: number): Observable<singleResponse<productsDtos[]>> {
    return this.http.get<singleResponse<productsDtos[]>>(
      `${environment.api}/Product/top-products-${type}`
    );
  }

  searchProducts(form: FormData): Observable<singleResponse<productsDtos[]>> {
    return this.http.post<singleResponse<productsDtos[]>>(
      `${environment.api}/Product/search-products`, form
    )
  }

  searchProductsShop(form: FormData): Observable<singleResponse<productsUsingShop[]>> {
    return this.http.post<singleResponse<productsUsingShop[]>>(
      `${environment.api}/Product/search-shop`, form
    )
  }
}
