import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, token } from '../environment/environment.bassic';
import { singleResponse } from '../model/response.model';
import {
  addressGetById,
  addressModel,
  addressRequest,
  districtDtos,
  proviceDtos,
  wardDtos,
} from '../model/address.model';
import { IAuth } from '../interface/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient, @Inject('IAuth') private auth: IAuth) {}

  // =======Get information city from assets/.json
  headers = new HttpHeaders({
    Token: `${token}`,
  });

  headerJWT = new HttpHeaders({
    Authorization: `Bearer ${this.auth.getCookie('TokenUser')}`,
    'Content-Type': 'application/json',
  });

  getprovince(): Observable<singleResponse<proviceDtos[]>> {
    return this.http.get<singleResponse<proviceDtos[]>>(
      'https://online-gateway.ghn.vn/shiip/public-api/master-data/province',
      { headers: this.headers }
    );
  }

  getDistrict(id: {
    province_id: number;
  }): Observable<singleResponse<districtDtos[]>> {
    return this.http.post<singleResponse<districtDtos[]>>(
      `https://online-gateway.ghn.vn/shiip/public-api/master-data/district`,
      id,
      { headers: this.headers }
    );
  }

  getWard(id: number): Observable<singleResponse<wardDtos[]>> {
    return this.http.get<singleResponse<wardDtos[]>>(
      `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${id}`,
      { headers: this.headers }
    );
  }

  create(request: addressRequest): Observable<singleResponse<string>> {
    return this.http.post<singleResponse<string>>(
      `${environment.api}/Address/set-item`,
      request,
      { headers: this.headerJWT }
    );
  }

  getData(id: number): Observable<singleResponse<addressModel[]>> {
    return this.http.get<singleResponse<addressModel[]>>(
      `${environment.api}/Address/get-data-${id}`,
      { headers: this.headerJWT }
    );
  }

  getDataById(
    requset: addressGetById
  ): Observable<singleResponse<addressModel>> {
    return this.http.post<singleResponse<addressModel>>(
      `${environment.api}/Address/get-by-id`,
      requset,
      { headers: this.headerJWT }
    );
  }
  deleteById(requset: addressGetById): Observable<singleResponse<string>> {
    const options = {
      headers: this.headerJWT,
      body: requset,
    };
    return this.http.delete<singleResponse<string>>(
      `${environment.api}/Address/delete-by-id`,
      options
    );
  }

  updateById(request: addressRequest): Observable<singleResponse<string>> {
    return this.http.put<singleResponse<string>>(
      `${environment.api}/Address/update-by-id`,
      request,
      { headers: this.headerJWT }
    );
  }
}
