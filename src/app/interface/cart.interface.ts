import { singleProductDto, variantDtos } from '../model/product.model';
import { Observable } from 'rxjs';
import { singleResponse } from '../model/response.model';
import { ICart } from '../model/cart.model';

export interface ICartRepository {
  setData(variant: variantDtos, singleProduct: singleProductDto): void;
  getData(): Observable<singleResponse<ICart[]>>;
  countNumberCart() : number;
}
