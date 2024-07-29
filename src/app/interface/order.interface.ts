import { Observable } from "rxjs";
import { orderResponse, singleResponse } from "../model/response.model";
import { ICancelOrderUserRequest, IOrderDetailDto, IOrderRequest, IOrderUserDto, IOrderUserRequest } from "../model/order.model";

export interface IOrderRepository {
  createOrder(request: IOrderRequest, token: string): Observable<orderResponse>;
  getOrderUser(token: string, request: IOrderUserRequest): Observable<singleResponse<IOrderUserDto[]>>;
  getOrderById(id: number): Observable<singleResponse<IOrderDetailDto>>
  cancelOrderByUser(id: number, request: ICancelOrderUserRequest): Observable<orderResponse>;
}
