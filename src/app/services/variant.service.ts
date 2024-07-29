import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { singleResponse } from '../model/response.model';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment.bassic';

@Injectable({
  providedIn: 'root',
})
export class VariantService {
  constructor(private http: HttpClient) {}

  getIdProduct(id: number): Observable<singleResponse<number>> {
    return this.http.get<singleResponse<number>>(
      `${environment.api}/Variant/idProduct-${id}`
    );
  }
}
