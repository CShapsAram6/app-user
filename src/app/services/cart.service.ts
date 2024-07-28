import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  ICart,
  ICartRedis,
  ICartRedisAfterLogin,
  IChangeQuantity,
} from '../model/cart.model';
import { Observable } from 'rxjs';
import { singleResponse } from '../model/response.model';
import { environment } from '../environment/environment.bassic';
import { IAuth } from '../interface/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, @Inject('IAuth') private auth: IAuth) {}

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.auth.getCookie('TokenUser')}`,
  });
  postDataAfterLogin(
    request: ICartRedisAfterLogin
  ): Observable<singleResponse<string>> {
    return this.http.post<singleResponse<string>>(
      `${environment.api}/Cart/cart-after-login`,
      request,
      { headers: this.headers }
    );
  }

  getData(id: number): Observable<singleResponse<ICart[]>> {
    return this.http.get<singleResponse<ICart[]>>(
      `${environment.api}/Cart/get-cart-${id}`,
      { headers: this.headers }
    );
  }

  setData(request: ICartRedis): Observable<singleResponse<string>> {
    return this.http.post<singleResponse<string>>(
      `${environment.api}/Cart/create-item`,
      request,
      { headers: this.headers }
    );
  }

  deleteCart(id: number, idCart: number): Observable<singleResponse<string>> {
    return this.http.delete<singleResponse<string>>(
      `${environment.api}/Cart/delete-item-${id}-${idCart}`,
      { headers: this.headers }
    );
  }

  changeQuantity(model: IChangeQuantity): Observable<singleResponse<string>> {
    return this.http.patch<singleResponse<string>>(
      `${environment.api}/Cart/change-quantity`,
      model
    );
  }
}
