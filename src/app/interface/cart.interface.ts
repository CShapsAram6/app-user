import { Injectable } from '@angular/core';
import { productsDtos } from '../model/product.model';
import { Observable } from 'rxjs';
import { singleResponse } from '../model/response.model';
import { ICartLocal } from '../model/cart.model';

export interface ICartRepository {
  setCart(cart: productsDtos): void;
  getCart(): Observable<singleResponse<ICartLocal[]>>;
}
