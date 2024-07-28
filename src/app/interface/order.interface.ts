import { Observable } from "rxjs";
import { orderResponse, singleResponse } from "../model/response.model";
import { IOrderRequest, IOrderUserDto, IOrderUserRequest } from "../model/order.model";

export interface IOrderRepository {
  createOrder(request: IOrderRequest, token: string): Observable<orderResponse>;
  getOrderUser(token: string, request: IOrderUserRequest): Observable<singleResponse<IOrderUserDto[]>>;
}
