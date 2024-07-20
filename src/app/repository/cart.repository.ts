import { Inject, Injectable } from '@angular/core';
import { ICartRepository } from '../interface/cart.interface';
import { ICart, ICartRedis, ICartRedisAfterLogin } from '../model/cart.model';
import {
  productsDtos,
  singleProductDto,
  variantDtos,
} from '../model/product.model';
import { Observable, of } from 'rxjs';
import { singleResponse } from '../model/response.model';
import { IAuth } from '../interface/auth.interface';
import { IUserToken } from '../model/user.model';
import { CartService } from '../services/cart.service';
import { get } from 'http';

@Injectable({ providedIn: 'root' })
export class CartRepository implements ICartRepository {
  constructor(
    private cartService: CartService,
    @Inject('IAuth') private auth: IAuth
  ) {}
  addCartEnterRedis(token: any): boolean {
    let informationAuth: IUserToken = this.auth.decodeToken(token);
    this.getData().subscribe((res) => {
      let request: ICartRedisAfterLogin = this.mapToRequest(
        res.data,
        informationAuth
      );
      this.cartService.postDataAfterLogin(request).subscribe((res) => {
        if (res.success) {
          localStorage.removeItem('cart');
          return;
        }
      });
    });
    return true;
  }
  mapToRequest(cart: ICart[], user: IUserToken): ICartRedisAfterLogin {
    return {
      accountId: Number(user.Id),
      itemCarts: cart,
    };
  }

  async setData(
    variant: variantDtos,
    singleProduct: singleProductDto
  ): Promise<void> {
    let token: string = this.auth.getCookie('TokenUser');
    let item: ICart = await this.mapToCartProduct(variant, singleProduct);
    if (!token) {
      await this.setDataWhenNotHaveToken(item);
      return;
    }
    this.setDataWhenHaveToken(item, token);
  }

  async setDataWhenNotHaveToken(item: ICart) {
    let local = localStorage.getItem('cart');
    if (local) {
      this.localExist(item, 'cart', local);
      return;
    }
    this.localNotExist(item, 'cart');
  }

  async setDataWhenHaveToken(item: ICart, token: string) {
    let user: IUserToken = this.auth.decodeToken(token);
    let request: ICartRedis = this.mapRequestCartResis(item, Number(user.Id));
    this.cartService.setData(request).subscribe((res) => {
      console.log(res);
    });
  }

  mapRequestCartResis(item: ICart, id: number): ICartRedis {
    return {
      accountId: id,
      itemCarts: item,
    };
  }
  getDataByToken(): Observable<singleResponse<ICart[]>> {
    let token: string = this.auth.getCookie('TokenUser');
    if (!token) {
      return this.getData();
    }
    let user: IUserToken = this.auth.decodeToken(token);
    return this.cartService.getData(Number(user.Id));
  }
  getData(): Observable<singleResponse<ICart[]>> {
    let local = localStorage.getItem('cart');
    if (!local) {
      return of({ data: [], success: false, message: 'not ok' });
    }
    let list: ICart[] = JSON.parse(local);
    return of({ data: list, success: true, message: 'ok' });
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
