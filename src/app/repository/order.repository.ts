import { Injectable } from "@angular/core";
import { IOrderRepository } from "../interface/order.interface";
import { OrderService } from "../services/order.service";
import { IOrderRequest } from "../model/order.model";
import { Observable } from "rxjs";
import { orderResponse } from "../model/response.model";

@Injectable({ providedIn: 'root' })
export class OrderRepository implements IOrderRepository {
  constructor(private orderService: OrderService) {}

  createOrder(request: IOrderRequest, token: string): Observable<orderResponse> {
    return this.orderService.createOrder(request, token);
  }
}
