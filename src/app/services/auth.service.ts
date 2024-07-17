import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { auth, ISignInRequest } from '../model/user.model';
import { catchError, map, Observable } from 'rxjs';
import { singleResponse } from '../model/response.model';
import { environment } from '../environment/environment.bassic';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signIn(request: ISignInRequest): Observable<singleResponse<string>> {
    return this.http
      .post<singleResponse<string>>(
        `${environment.api}/User/login-user`,
        request
      )
      .pipe(
        map((response) => {
          auth.set('TokenUser', response.data, new Date(), '/', '', '');
          return response;
        }),
        catchError((err) => {
          throw err;
        })
      );
  }
}
