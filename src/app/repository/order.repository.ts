import { Injectable } from "@angular/core";
import { IOrderRepository } from "../interface/order.interface";
import { OrderService } from "../services/order.service";
import { ICancelOrderUserRequest, IOrderDetailDto, IOrderRequest, IOrderUserDto, IOrderUserRequest } from "../model/order.model";
import { Observable, of } from "rxjs";
import { orderResponse, singleResponse } from "../model/response.model";

@Injectable({ providedIn: 'root' })
export class OrderRepository implements IOrderRepository {
  constructor(private orderService: OrderService) {}

  createOrder(request: IOrderRequest, token: string): Observable<orderResponse> {
    return this.orderService.createOrder(request, token);
  }

  getOrderUser(token: string, request: IOrderUserRequest): Observable<singleResponse<IOrderUserDto[]>> {
    return this.orderService.getOrderUser(token, request);
  }

  getOrderById(id: number): Observable<singleResponse<IOrderDetailDto>> {
    return this.orderService.getOrderById(id);
  }

  cancelOrderByUser(id: number, request: ICancelOrderUserRequest): Observable<orderResponse> {
    return this.orderService.cancelOrderByUser(id, request);
  }

  sendEmail(id: number): Observable<orderResponse> {
    return this.orderService.sendEmail(id);
  }
}
