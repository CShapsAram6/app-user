import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { voucherDtos } from '../model/vouchers.model';
import { environment } from '../environment/environment.bassic';
import { singleResponse } from '../model/response.model';

@Injectable({
  providedIn: 'root',
})
export class VouchersService {
  constructor(private http: HttpClient) {}
  getData(): Observable<singleResponse<voucherDtos[]>> {
    return this.http.get<singleResponse<voucherDtos[]>>(
      `${environment.api}/Voucher/get-all`
    );
  }
}
