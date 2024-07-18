import { ISignInRequest, IUserToken } from '../model/user.model';

export interface IAuth {
  setCookie(
    name: string,
    value: string,
    expires: Date,
    path: string,
    domain: string,
    secure: string
  ): void;
  getCookie(name: string): string;
  handleLogin(response: any): ISignInRequest;
  decodeToken(token: any): IUserToken;
}
