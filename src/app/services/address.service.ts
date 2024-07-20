import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { vietNameseDtos } from '../model/address.model';
import { token } from '../environment/environment.bassic';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}

  // =======Get information city from assets/.json
  getCity(): Observable<vietNameseDtos[]> {
    // get value from assets/.json file
    return this.http.get<vietNameseDtos[]>(
      'assets/simplified_json_generated_data_vn_units.json'
    );
  }

  // =======Filter information District from assets/.json
  getDistrict(id: string): Observable<vietNameseDtos[]> {
    return this.http
      .get<vietNameseDtos[]>(
        'assets/simplified_json_generated_data_vn_units.json'
      )
      .pipe(
        map((response) => {
          // Filter District from response
          const newItem: any[] = response.filter((item) => item.Code === id);
          return newItem[0].District;
        }),
        catchError((err) => {
          throw err;
        })
      );
  }

  // =======Filter information Ward from assets/.json
  GetWard(id: string, idCity: string): Observable<vietNameseDtos[]> {
    return this.http
      .get<any[]>('assets/simplified_json_generated_data_vn_units.json')
      .pipe(
        map((response) => {
          // Filter District from response
          const itemDistrict: any = response.find(
            (item) => item.Code === idCity
          ).District;

          // Filter Ward from itemCity
          const itemWard: any = itemDistrict.find(
            (item: any) => item.Code === id
          ).Ward;

          return itemWard;
        }),
        catchError((err) => {
          throw err;
        })
      );
  }

  headers = new HttpHeaders({
    Token: `${token}`,
  });

  getprovince(): Observable<any[]> {
    return this.http.get<any[]>(
      'https://online-gateway.ghn.vn/shiip/public-api/master-data/province',
      { headers: this.headers }
    );
  }
}
