import { Injectable } from "@angular/core";
import { IOrderRepository } from "../interface/order.interface";
import { OrderService } from "../services/order.service";
import { IOrderRequest, IOrderUserDto, IOrderUserRequest } from "../model/order.model";
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
}
