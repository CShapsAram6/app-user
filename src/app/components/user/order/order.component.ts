import { Component, Inject, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { IOrderRepository } from '../../../interface/order.interface';
import { IAuth } from '../../../interface/auth.interface';
import { ICancelOrderUserRequest, IOrderUserDto, IOrderUserRequest } from '../../../model/order.model';
import { FormControl } from '@angular/forms';

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

  buttonShow: boolean = false
  activeTab: string = 'Tất cả'
  pageSize: number = 10
  orderUserDto: IOrderUserDto [] = [];
  token: string = this.auth.getCookie('TokenUser');

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
        if(this.orderUserDto.length > 10){
          this.buttonShow = true
        }
        else{
          this.buttonShow = false
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  reason = new FormControl('');
  cancelOrderByUser(id: number) {
    console.log(id)
    console.log(this.reason.value)
    const request: ICancelOrderUserRequest = {
      reasonCancelUser: this.reason.value as string,
      token: this.token
    }
    this.orderRepository.cancelOrderByUser(id, request).subscribe(
      (res) => {
        alert(res.message)
        this.reason.setValue('')
        this.loadOrderUser()
      },
      (err) => {
        console.log(err);
      }
    )
  }
}
