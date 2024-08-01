import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { singleResponse } from '../model/response.model';
import { environment } from '../environment/environment.bassic';
import { categoryDtos } from '../model/categorys.model';

@Injectable({
  providedIn: 'root',
})
export class CategorysService {
  constructor(private http: HttpClient) {}

  getDataById(id: number): Observable<categoryDtos> {
    return this.http.get<categoryDtos>(
      `${environment.api}/Category/Get-cate-${id}`
    );
  }
  getData(): Observable<singleResponse<categoryDtos[]>> {
    return this.http.get<singleResponse<categoryDtos[]>>(
      `${environment.api}/Category/get-all`
    );
  }
}
