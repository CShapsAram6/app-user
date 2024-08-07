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
  constructor(private http: HttpClient, private authService: AuthService) {}
  
  getToken() {
    return this.authService.getTokenUser();
  }

  getData(): Observable<singleResponse<productsUsingShop[]>> {
    return this.http.get<singleResponse<productsUsingShop[]>>(
      `${environment.api}/User/get-wishlist-product-${this.getToken()}`,
    );
  }

  getProductForWishList(): Observable<singleResponse<ProductForWishList[]>> {
    return this.http.get<singleResponse<ProductForWishList[]>>(
      `${environment.api}/User/allproduct-for-wihsList-${this.getToken()}`,
    );
  }
}
