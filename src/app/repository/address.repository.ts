import { Inject, Injectable } from '@angular/core';
import { IAddressRepository } from '../interface/address.interfaces';
import { IAuth } from '../interface/auth.interface';
import { addressModel, addressRequest } from '../model/address.model';
import { IUserToken } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class AddressRepository implements IAddressRepository {
  constructor(@Inject('IAuth') private auth: IAuth) {}
  generateRequest(model: addressModel): addressRequest {
    let token: string = this.auth.getCookie('TokenUser');

    let user: IUserToken = this.auth.decodeToken(token);
    return {
      id: Number(user.Id),
      address: model,
    };
  }
  generateRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
