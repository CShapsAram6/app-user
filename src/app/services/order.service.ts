import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { token } from '../environment/environment.bassic';
import { Observable } from 'rxjs';
import { singleResponse } from '../model/response.model';
import {
  RequestGHN,
  requestServiceDelivery,
  responseGHN,
  responseServiceDelivery,
} from '../model/serviceDelivery.model';

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
}
