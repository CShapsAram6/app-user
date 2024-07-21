import { Inject, Injectable } from '@angular/core';
import { IServiceOrder } from '../interface/serviceOrder.interface';
import {
  ItemGHN,
  RequestGHN,
  requestServiceDelivery,
  responseServiceDelivery,
} from '../model/serviceDelivery.model';
import {
  environment,
  form_distrct_id,
} from '../environment/environment.bassic';
import { ICart, ICartRedis } from '../model/cart.model';
import { ICartRepository } from '../interface/cart.interface';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServiceOrderRepository implements IServiceOrder {
  constructor(@Inject('ICartRepository') private cart: ICartRepository) {}
  convertRequestGHN(
    district_id: number,
    ward_id: string
  ): Observable<RequestGHN> {
    return this.cart.getDataByToken().pipe(
      map((res) => {
        let arrIcart: ICart[] = res.data;
        let request: RequestGHN = {
          service_type_id: 2,
          from_district_id: form_distrct_id,
          to_district_id: district_id,
          to_ward_code: ward_id,
          weight: 100,
          items: this.mapToItemRequestGHN(arrIcart),
        };
        return request;
      })
    );
  }

  mapToItemRequestGHN(arrIcart: ICart[]): ItemGHN[] {
    let arrItem: ItemGHN[] = [];
    for (let item of arrIcart) {
      arrItem.push({
        name: item.name,
        quantity: item.quantity,
      });
    }
    return arrItem;
  }
  mapToRequest(to_id: number): requestServiceDelivery {
    return {
      shop_id: 5205632,
      from_district: form_distrct_id,
      to_district: to_id,
    };
  }
}
