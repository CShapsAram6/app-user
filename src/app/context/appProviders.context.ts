import { Provider } from '@angular/core';
import { CartRepository } from '../repository/cart.repository';
import { AddressRepository } from '../repository/address.repository';

export const appProviders: Provider[] = [
  { provide: 'ICartRepository', useClass: CartRepository },
  { provide: 'IAddressRepository', useClass: AddressRepository}
];
