import { Component, Inject, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { IOrderRepository } from '../../../interface/order.interface';
import { IAuth } from '../../../interface/auth.interface';
import { IOrderUserDto, IOrderUserRequest } from '../../../model/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit{
  constructor(
    @Inject('IOrderRepository') private orderRepository: IOrderRepository,
    @Inject('IAuth') private auth: IAuth,
    private orderService: OrderService) {}
  ngOnInit(): void {
    this.loadOrderUser()
  }

  activeTab: string = 'Tất cả'
  pageSize: number = 10
  orderUserDto: IOrderUserDto [] = [];

  getTab(){
    return  ['Tất cả', 'Chờ thanh toán', 'Vận chuyển', 'Hoàn thành', 'Đã hủy', 'Trả hàng/Hoàn tiền']
  }
  setActiveTab(tab: string) {
    this.activeTab = tab
    this.pageSize = 10
    this.loadOrderUser()
  }
  SeeMoreOrder(){
    this.pageSize += 10
    this.loadOrderUser()
  }
  loadOrderUser() {
    let token: string = this.auth.getCookie('TokenUser')
    const request: IOrderUserRequest = {
      status: this.activeTab,
      pageSize: this.pageSize
    }
    this.orderRepository.getOrderUser(token, request).subscribe(
      (res) => {
        console.log(res);
        this.orderUserDto = res.data
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
