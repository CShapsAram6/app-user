import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { IOrderDetailDto } from '../../../model/order.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent implements OnInit {
  orderId: number = 0;
  orderDetail!: IOrderDetailDto;
  constructor(private route: ActivatedRoute,
    private orderService: OrderService
  ) {}
  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['id'];
    console.log(this.orderId);
    this.getOrderById();
  }

  getOrderById() {
    this.orderService.getOrderById(this.orderId).subscribe(
      (res) => {
        this.orderDetail = res;
        console.log(this.orderDetail);
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
