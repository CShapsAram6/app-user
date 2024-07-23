import { Provider } from '@angular/core';
import { CartRepository } from '../repository/cart.repository';
import { AddressRepository } from '../repository/address.repository';
import { AuthRepository } from '../repository/auth.repository';
import { ServiceOrderRepository } from '../repository/serviceOrder.repository';
import { OrderRepository } from '../repository/order.repository';

export const appProviders: Provider[] = [
  { provide: 'ICartRepository', useClass: CartRepository },
  { provide: 'IAddressRepository', useClass: AddressRepository },
  { provide: 'IAuth', useClass: AuthRepository },
  { provide: 'IServiceOrder', useClass: ServiceOrderRepository },
  { provide: 'IOrderRepository', useClass: OrderRepository },
];
