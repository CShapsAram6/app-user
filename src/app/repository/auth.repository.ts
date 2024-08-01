import { Inject, Injectable } from '@angular/core';
import { IAuth } from '../interface/auth.interface';
import { ISignInRequest, IUserToken } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class AuthRepository implements IAuth {
  constructor() {}
  decodeToken(token: any): IUserToken {
    return JSON.parse(atob(token.split('.')[1]));
  }
  handleLogin(response: any): ISignInRequest {
    return {
      userName: response.userName,
      password: response.password,
    };
  }
  setCookie(
    name: string,
    value: string,
    expires: Date,
    path: string,
    domain: string,
    secure: string
  ): void {
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    if (expires instanceof Date) {
      cookieText += `; expires=${expires.toString()}`;
    }

    if (path) cookieText += `; path=${path}`;
    if (domain) cookieText += `; domain=${domain}`;
    if (secure) cookieText += `; secure`;

    document.cookie = cookieText;
  }
  getCookie(name: string): string {
    const cookieName = `${encodeURIComponent(name)}=`;
    const cookie = document.cookie;
    let value = null;

    const startIndex = cookie.indexOf(cookieName);
    if (startIndex > -1) {
      let endIndex: number = cookie.indexOf(';', startIndex);
      if (endIndex == -1) {
        endIndex = cookie.length;
      }
      value = decodeURIComponent(
        cookie.substring(startIndex + cookieName.length, endIndex)
      );
    }
    return value as string;
  }
}
