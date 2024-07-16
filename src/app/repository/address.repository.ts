import { Injectable } from '@angular/core';
import { IAddressRepository } from '../interface/address.interfaces';

@Injectable({ providedIn: 'root' })
export class AddressRepository implements IAddressRepository {
  constructor() {}
  setAddressComplate(address: string): void {
    console.log(address);
  }
}
