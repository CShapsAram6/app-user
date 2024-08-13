import { AuthRepository } from './../repository/auth.repository';
import { token } from './../environment/environment.bassic';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment.bassic';
import { Observable } from 'rxjs';
import { singleResponse } from '../model/response.model';
import { productsDtos, productsUsingShop } from '../model/product.model';
import { ProductForWishList } from '../model/wishList.model';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  constructor(private http: HttpClient, private authService: AuthService, authRepository: AuthRepository) {}
  

  getData(page: number): Observable<singleResponse<productsUsingShop[]>> {
    const request = {
      page: page,
      token: this.authService.getTokenUser(),
    }
    return this.http.post<singleResponse<productsUsingShop[]>>(
      `${environment.api}/User/get-wishlist-product`, request
    );
  }

  getProductForWishList(): Observable<singleResponse<ProductForWishList[]>> {
    return this.http.get<singleResponse<ProductForWishList[]>>(
      `${environment.api}/User/allproduct-for-wihsList-${this.authService.getTokenUser()}`,
    );
  }

  postWishList(id: number): Observable<any> {
    var token = this.authService.getTokenUser();
    const data = {
      productId: id,
      tokenUser: token,
    }
    return this.http.post<any>(`${environment.api}/User/add-wishlish`, data);
  }

  deleteWishList(id: number): Observable<any> {
    var token = this.authService.getTokenUser();
    const data = {
      productId: id,
      tokenUser: token,
    }
    return this.http.post<any>(`${environment.api}/User/delete-wishlish`, data);
  }
}
