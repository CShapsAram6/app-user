import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ISignInRequest, ISignUp } from '../model/user.model';
import { catchError, map, Observable } from 'rxjs';
import { singleResponse } from '../model/response.model';
import { environment } from '../environment/environment.bassic';
import { IAuth } from '../interface/auth.interface';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { error } from 'console';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, @Inject('IAuth') private auth: IAuth) {}

  signIn(request: ISignInRequest): Observable<singleResponse<string>> {
    return this.http
      .post<singleResponse<string>>(
        `${environment.api}/User/login-user`,
        request
      )
      .pipe(
        map((response) => {
          this.auth.setCookie(
            'TokenUser',
            response.data,
            new Date(),
            '/',
            '',
            ''
          );
          return response;
        }),
        catchError((err) => {
          throw err;
        })
      );
  }

  signUp(data:ISignUp):Observable<any>{
    return this.http.post<any>(`${environment.api}/User/create-user`,data);
  }
}
