import { Injectable } from '@angular/core';
import { IServiceOrder } from '../interface/serviceOrder.interface';
import {
  requestServiceDelivery,
  responseServiceDelivery,
} from '../model/serviceDelivery.model';

@Injectable({ providedIn: 'root' })
export class ServiceOrderRepository implements IServiceOrder {
  mapToRequest(to_id: number): requestServiceDelivery {
    return {
      shop_id: 5205632,
      from_district: 1552,
      to_district: to_id,
    };
  }
}
