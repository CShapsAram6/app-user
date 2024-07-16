import { Injectable } from '@angular/core';
import { ICartRepository } from '../interface/cart.interface';
import { ICartLocal } from '../model/cart.model';
import { productsDtos } from '../model/product.model';
import { Observable, of } from 'rxjs';
import { singleResponse } from '../model/response.model';

@Injectable({ providedIn: 'root' })
export class CartRepository implements ICartRepository {
  constructor() {}
  setCart(cart: productsDtos): void {
    let item: ICartLocal = this.mapperToCartLocal(cart);
    let local = localStorage.getItem('cart');
    if (local) {
      this.localExist(item, 'cart', local);
      return;
    }
    this.localNotExist(item, 'cart');
  }
  mapperToCartLocal(item: productsDtos): ICartLocal {
    return {
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: 1,
      size: item.size,
      amount: item.price * 1,
    };
  }
  // if local have key == 'key' not exist
  localNotExist(item: ICartLocal, key: string) {
    let arrCart = [];
    arrCart.push(item);
    localStorage.setItem(key, JSON.stringify(arrCart));
  }
  // if local have key == 'key' exist
  localExist(item: ICartLocal, key: string, local: any) {
    let list: ICartLocal[] = JSON.parse(local);
    let index = list.findIndex((x) => x.id == item.id);
    if (index == -1) {
      list.push(item);
    } else {
      list[index].quantity += 1;
      list[index].amount += item.price;
    }
    localStorage.setItem('cart', JSON.stringify(list));
  }

  getCart(): Observable<singleResponse<ICartLocal[]>> {
    let local = localStorage.getItem('cart');
    if (!local) {
      return of({ data: [], sussess: false, message: 'not ok' });
    }
    let list: ICartLocal[] = JSON.parse(local);
    return of({ data: list, sussess: true, message: 'ok' });
  }
}
