import { Component, Inject, OnInit } from '@angular/core';
import { IOrderRepository } from '../../../interface/order.interface';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss'
})
export class PaymentSuccessComponent implements OnInit {

  constructor(@Inject('IOrderRepository') private orderRepository: IOrderRepository) { }

  ngOnInit(): void {
    const orderId = localStorage.getItem('orderId');

    if (orderId) {
      this.SendEmail(+orderId);
      localStorage.removeItem('orderId');
    }
  }
  SendEmail(id: number) {
    this.orderRepository.sendEmail(id).subscribe((res) => {
      console.log(res);
    });
  }
}
