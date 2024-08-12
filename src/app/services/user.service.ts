import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { singleResponse } from '../model/response.model';
import { environment } from '../environment/environment.bassic';
import {  UserInfoDTO } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getInfoUser(Id: number): Observable<singleResponse<UserInfoDTO>> {
    return this.http.get<singleResponse<UserInfoDTO>>(
      `${environment.api}/User/get-user-info?id=${Id}`
    );
  }
  UpdateUserInfo(Id: number, data: any) {
    return this.http.put(`${environment.api}/User/update-user-info?id=${Id}`, data);
  }
  UpdateUser(data : any){
    return this.http.put(`${environment.api}/User/update-user`, data);
  }
}
