import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ISignInRequest, ISignUp, userByEmail } from '../model/user.model';
import { catchError, map, Observable } from 'rxjs';
import { singleResponse } from '../model/response.model';
import { environment } from '../environment/environment.bassic';
import { IAuth } from '../interface/auth.interface';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, @Inject('IAuth') private auth: IAuth, private cookieService: CookieService, private toastrServices: ToastrService) { }
  private tokenKey = 'TokenUser';

  signIn(request: ISignInRequest): Observable<singleResponse<string>> {
    return this.http
      .post<singleResponse<string>>(
        `${environment.api}/User/login-user`,
        request
      )
      .pipe(
        map((response) => {
          if (response.data == "Không có token") {
            this.toastrServices.error("Kiểm trả lại tên đăng nhập và mật khẩu", "Thông báo")
            return response;
          }
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
          this.toastrServices.error("Kiểm trả lại tên đăng nhập và mật khẩu", "Thông báo")
          throw err;
        })
      );
  }

  signUp(data: ISignUp): Observable<any> {
    return this.http.post<any>(`${environment.api}/User/create-user`, data);
  }

  CheckUserSignUp(
    username: string,
    phone: string,
    email: String
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.api}/User/check-user-signup?userName=${username}&phone=${phone}&email=${email}`
    );
  }

  GetNameUser(id: number): Observable<singleResponse<string>> {
    return this.http.get<singleResponse<string>>(
      `${environment.api}/User/get-name-${id}`
    );
  }

  signInWithEmail(request: userByEmail): Observable<singleResponse<string>> {
    return this.http.post<singleResponse<string>>(
      `${environment.api}/User/signin-email`, request
    ).pipe(
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

  getTokenUser(): string | null {
    return this.cookieService.get(this.tokenKey) || null;
  }
}
