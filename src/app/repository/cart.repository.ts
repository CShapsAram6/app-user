import { Injectable } from '@angular/core';
import { ICartRepository } from '../interface/cart.interface';
import { ICart, ICartLocal } from '../model/cart.model';
import {
  productsDtos,
  singleProductDto,
  variantDtos,
} from '../model/product.model';
import { Observable, of } from 'rxjs';
import { singleResponse } from '../model/response.model';

@Injectable({ providedIn: 'root' })
export class CartRepository implements ICartRepository {
  constructor() {}

  async setData(
    variant: variantDtos,
    singleProduct: singleProductDto
  ): Promise<void> {
    let item: ICart = await this.mapToCartProduct(variant, singleProduct);
    let local = localStorage.getItem('cart');
    if (local) {
      this.localExist(item, 'cart', local);
      return;
    }
    this.localNotExist(item, 'cart');
  }
  getData(): Observable<singleResponse<ICart[]>> {
    let local = localStorage.getItem('cart');
    if (!local) {
      return of({ data: [], sussess: false, message: 'not ok' });
    }
    let list: ICart[] = JSON.parse(local);
    return of({ data: list, sussess: true, message: 'ok' });
  }

  // if local have key == 'key' not exist
  localNotExist(item: ICart, key: string) {
    let arrCart = [];
    arrCart.push(item);
    localStorage.setItem(key, JSON.stringify(arrCart));
  }
  // if local have key == 'key' exist
  localExist(item: ICart, key: string, local: any) {
    let list: ICart[] = JSON.parse(local);
    let index = list.findIndex((x) => x.id == item.id);
    if (index == -1) {
      list.push(item);
    } else {
      list[index].quantity += 1;
      list[index].total += item.price;
    }
    localStorage.setItem('cart', JSON.stringify(list));
  }

  async mapToCartProduct(
    vari: variantDtos,
    pro: singleProductDto
  ): Promise<ICart> {
    return {
      id: pro.id,
      name: pro.name,
      quantity: 1,
      size: vari.size,
      price: vari.price,
      image: pro.images.find((a) => a.isActive == true)?.link as string,
      total: vari.price * 1,
    };
  }

  countNumberCart(): number {
    let local = localStorage.getItem('cart');
    if (!local) {
      return 0;
    }
    let list: ICart[] = JSON.parse(local);
    return list.length;
  }
}
