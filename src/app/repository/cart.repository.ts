import { Inject, Injectable } from '@angular/core';
import { ICartRepository } from '../interface/cart.interface';
import {
  ICart,
  ICartRedis,
  ICartRedisAfterLogin,
  IChangeQuantity,
  IColorCart,
} from '../model/cart.model';
import {
  productsUsingShop,
  singleProductDto,
  variantDtos,
} from '../model/product.model';
import { Observable, of } from 'rxjs';
import { singleResponse } from '../model/response.model';
import { IAuth } from '../interface/auth.interface';
import { IUserToken } from '../model/user.model';
import { CartService } from '../services/cart.service';

@Injectable({ providedIn: 'root' })
export class CartRepository implements ICartRepository {
  constructor(
    private cartService: CartService,
    @Inject('IAuth') private auth: IAuth
  ) {}
  changeQuantity(model: IChangeQuantity): Observable<singleResponse<string>> {
    let token: string = this.auth.getCookie('TokenUser');
    let user: IUserToken = this.auth.decodeToken(token);
    model.idAccount = Number(user.Id);
    return this.cartService.changeQuantity(model);
  }
  deleteCart(id: number): Observable<singleResponse<string>> {
    let token: string = this.auth.getCookie('TokenUser');
    let user: IUserToken = this.auth.decodeToken(token);
    return this.cartService.deleteCart(Number(user.Id), id);
  }
  convertStringFile(size: number): string {
    switch (size) {
      case 1:
        return 'Lớn';
      case 2:
        return 'Vừa';
      default:
        return 'Nhỏ';
    }
  }
  calculationTotal(carts: ICart[]): number {
    let total: number = 0;
    for (let i = 0; i < carts.length; i++) {
      total += carts[i].price * carts[i].quantity;
    }
    return total;
  }
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
          window.location.href = 'http://localhost:4200/';
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
    singleProduct: singleProductDto,
    color: IColorCart[]
  ): Promise<void> {
    let token: string = this.auth.getCookie('TokenUser');
    let item: ICart = await this.mapToCartProduct(
      variant,
      singleProduct,
      color
    );
    if (!token) {
      await this.setDataWhenNotHaveToken(item);
      return;
    }
    this.setDataWhenHaveToken(item, token);
  }

  async setCartShop(
    variant: variantDtos,
    colors: IColorCart[],
    products: productsUsingShop
  ) {
    let token: string = this.auth.getCookie('TokenUser');
    let item: ICart = await this.mapperToCartLocal(variant, colors, products);
    if (!token) {
      await this.setDataWhenNotHaveToken(item);
      return;
    }
    this.setDataWhenHaveToken(item, token);
  }

  mapperToCartLocal(
    variant: variantDtos,
    colors: IColorCart[],
    products: productsUsingShop
  ): ICart {
    return {
      id: variant.id,
      name: products.name,
      image: products.image,
      price: variant.price,
      quantity: colors[0].quantity,
      size: variant.size,
      total: variant.price * 1,
      colors: colors,
    };
  }

  async setDataWhenNotHaveToken(item: ICart) {
    let local = localStorage.getItem('cart');
    if (local) {
      this.localExist(item, 'cart', local, item.colors);
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
  localExist(item: ICart, key: string, local: any, colors: IColorCart[]) {
    let list: ICart[] = JSON.parse(local);
    let index = list.findIndex((x) => x.id == item.id);
    let arrColor: IColorCart[] = [];
    if (index == -1) {
      list.push(item);
    } else {
      colors.map((item) => {
        arrColor = this.colorExist(list[index].colors, item);
      });
      let totalQuantity = 0;
      arrColor.map((item) => {
        totalQuantity += item.quantity;
      });
      list[index].quantity = totalQuantity;
    }

    localStorage.setItem('cart', JSON.stringify(list));
  }

  colorExist(color: IColorCart[], item: IColorCart): IColorCart[] {
    let index = color.findIndex((x) => x.id == item.id);
    if (index == -1) {
      return color;
    }
    color[index].quantity += item.quantity;
    return color;
  }

  async mapToCartProduct(
    vari: variantDtos,
    pro: singleProductDto,
    color: IColorCart[]
  ): Promise<ICart> {
    let totalQuantity = 0;
    color.map((item) => {
      totalQuantity += item.quantity;
    });
    return {
      id: vari.id,
      name: pro.name,
      quantity: totalQuantity,
      size: vari.size,
      price: vari.price,
      image: pro.images.find((a) => a.isActive == true)?.link as string,
      total: vari.price * totalQuantity,
      colors: color,
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
