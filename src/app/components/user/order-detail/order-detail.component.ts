import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { IOrderDetailDto } from '../../../model/order.model';
import { IOrderRepository } from '../../../interface/order.interface';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent implements OnInit {

  orderId: number = 0;
  orderDetail!: IOrderDetailDto;
  constructor(private route: ActivatedRoute,
    private orderService: OrderService,
    @Inject('IOrderRepository') private orderRepository: IOrderRepository
  ) {}
  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['id'];
    console.log(this.orderId);
    this.getOrderById();
  }


  getStatusClass1(statusOrder: number, statusDelivery: number) {
    if (statusOrder === 0 && statusDelivery === 0) {
      return 'order-default'; // Chờ xác nhận
    } else if ((statusOrder === 1 && statusDelivery === 1 ) || (statusOrder === 1 && statusDelivery === 2)) {
      return 'order-green'; // Đang giao hàng
    } else if (statusOrder === 1 && statusDelivery === 3 ) {
      return 'order-green'; // Giao hàng thành công
    } else if ((statusOrder === 2 || statusOrder === 3) && (statusDelivery === 0 || statusDelivery === 3)) {
      return 'order-red'; // Hủy đơn
    } else {
      return ''; // Trạng thái không xác định
    }
  }
  getStatusClass2(statusOrder: number, statusDelivery: number) {
    if ((statusOrder === 0 && statusDelivery === 0) || (statusOrder === 2 || statusOrder === 3) ) {
      return 'order-default'; // Chờ xác nhận
    } else if ((statusOrder === 1 && statusDelivery === 1) || (statusOrder === 1 && statusDelivery === 2) || (statusOrder === 1 && statusDelivery === 3) ) {
      return 'order-green'; // Đang giao hàng
    } else {
      return ''; // Trạng thái không xác định
    }
  }
  getStatusClass3(statusOrder: number, statusDelivery: number) {
    if ((statusOrder === 0 && statusDelivery === 0) || (statusOrder === 1 && statusDelivery === 1) || (statusOrder === 2 || statusOrder === 3) ) {
      return 'order-default'; // Chờ xác nhận
    } else if ((statusOrder === 1 && statusDelivery === 2) ) {
      return 'order-green'; // Đang giao hàng
    } else if ((statusOrder === 1 && statusDelivery === 3) ) {
      return 'order-red'; // Giao hàng thất bại
    }
    else {
      return ''; // Trạng thái không xác định
    }
  }


  getOrderById() {
    this.orderRepository.getOrderById(this.orderId).subscribe(
      (res) => {
        this.orderDetail = res.data;
        console.log(this.orderDetail);
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
