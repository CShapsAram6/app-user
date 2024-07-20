import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { singleResponse } from '../model/response.model';
import { environment } from '../environment/environment.bassic';
import { IPayMentDtos } from '../model/payments.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  getData(): Observable<singleResponse<IPayMentDtos[]>> {
    return this.http.get<singleResponse<IPayMentDtos[]>>(
      `${environment.api}/PayMent/get-all`
    );
  }
}
