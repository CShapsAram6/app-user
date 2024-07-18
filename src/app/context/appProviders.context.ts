import { Provider } from '@angular/core';
import { CartRepository } from '../repository/cart.repository';
import { AddressRepository } from '../repository/address.repository';
import { AuthRepository } from '../repository/auth.repository';

export const appProviders: Provider[] = [
  { provide: 'ICartRepository', useClass: CartRepository },
  { provide: 'IAddressRepository', useClass: AddressRepository },
  { provide: 'IAuth', useClass: AuthRepository },
];
