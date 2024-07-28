import { singleProductDto, variantDtos } from '../model/product.model';
import { Observable } from 'rxjs';
import { singleResponse } from '../model/response.model';
import { ICart, IChangeQuantity, IColorCart } from '../model/cart.model';

export interface ICartRepository {
  setData(
    variant: variantDtos,
    singleProduct: singleProductDto,
    color: IColorCart[]
  ): void;
  getData(): Observable<singleResponse<ICart[]>>;
  countNumberCart(): number;
  addCartEnterRedis(token: any): boolean;
  getDataByToken(): Observable<singleResponse<ICart[]>>;
  calculationTotal(carts: ICart[]): number;
  convertStringFile(size: number): string;
  deleteCart(id: number): Observable<singleResponse<string>>;
  changeQuantity(model: IChangeQuantity): Observable<singleResponse<string>>;
}
