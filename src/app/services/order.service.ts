import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, token } from '../environment/environment.bassic';
import { Observable } from 'rxjs';
import { orderResponse, singleResponse } from '../model/response.model';
import {
  RequestGHN,
  requestServiceDelivery,
  responseGHN,
  responseServiceDelivery,
} from '../model/serviceDelivery.model';
import { ICancelOrderUserRequest, IOrderDetailDto, IOrderRequest, IOrderUserDto, IOrderUserRequest } from '../model/order.model';
import { HtmlParser } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  headers = new HttpHeaders({
    Token: `${token}`,
  });

  getServicesOrder(
    request: requestServiceDelivery
  ): Observable<singleResponse<responseServiceDelivery[]>> {
    return this.http.post<singleResponse<responseServiceDelivery[]>>(
      'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services',
      request,
      { headers: this.headers }
    );
  }

  getTipDelivery(request: RequestGHN): Observable<singleResponse<responseGHN>> {
    return this.http.post<singleResponse<responseGHN>>(
      'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',
      request,
      { headers: this.headers }
    );
  }

  createOrder(request: IOrderRequest, token: string){
    return this.http.post<orderResponse>(`${environment.api}/Order/create-order-${token}`, request);
  }

  getOrderUser(token: string, request: IOrderUserRequest): Observable<singleResponse<IOrderUserDto[]>> {
    const parmas = new HttpParams()
      .set('status', request.status)
      .set('pageSize', request.pageSize)
    return this.http.get<singleResponse<IOrderUserDto[]>>(
      `${environment.api}/Order/get-order-user-${token}`, {params: parmas}
    );
  }

  getOrderById(id: number): Observable<singleResponse<IOrderDetailDto>> {
    return this.http.get<singleResponse<IOrderDetailDto>>(
      `${environment.api}/Order/get-orderdetail-user-${id}`
    );
  }

  cancelOrderByUser(id: number, request: ICancelOrderUserRequest): Observable<orderResponse> {
    return this.http.put<orderResponse>(
      `${environment.api}/Order/cancel-user-${id}`,
      request
    );
  }

  sendEmail(id: number): Observable<orderResponse> {
    return this.http.post<orderResponse>(`${environment.api}/Order/send-email-${id}`, {});
  }
}
