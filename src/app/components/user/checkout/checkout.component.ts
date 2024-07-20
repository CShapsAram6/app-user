import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ICartRepository } from '../../../interface/cart.interface';
import { ICart } from '../../../model/cart.model';
import { AddressComponent } from '../address/address.component';
import { PaymentService } from '../../../services/payment.service';
import { IPayMentDtos } from '../../../model/payments.model';
import { VoucherComponent } from '../voucher/voucher.component';
import { voucherDtos } from '../../../model/vouchers.model';
import { addressModel } from '../../../model/address.model';
import { OrderService } from '../../../services/order.service';
import {
  requestServiceDelivery,
  responseServiceDelivery,
} from '../../../model/serviceDelivery.model';
import { IServiceOrder } from '../../../interface/serviceOrder.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  @ViewChild(AddressComponent) addressComponent!: AddressComponent;
  @ViewChild(VoucherComponent) voucherComponent!: VoucherComponent;
  constructor(
    @Inject('ICartRepository') private cartRepostory: ICartRepository,
    @Inject('IServiceOrder') private serviceRepostory: IServiceOrder,
    private paymentService: PaymentService,
    private orderService: OrderService
  ) {}
  arrCart: ICart[] = [];
  arrPayMent: IPayMentDtos[] = [];
  isActive: number = 0;
  isService: number = 0;
  voucher: voucherDtos = {} as voucherDtos;
  address: addressModel = {} as addressModel;
  arrService: responseServiceDelivery[] = [];
  ngOnInit(): void {
    this.LoadCart();
    this.LoadPayment();
  }

  LoadService(to_id: number) {
    let request: requestServiceDelivery =
      this.serviceRepostory.mapToRequest(to_id);
    this.orderService.getServicesOrder(request).subscribe((res) => {
      this.arrService = res.data;
      this.isService = res.data[0].service_type_id;
    });
  }

  LoadCart() {
    this.cartRepostory.getDataByToken().subscribe((res) => {
      this.arrCart = res.data;
    });
  }

  LoadPayment() {
    this.paymentService.getData().subscribe((response) => {
      this.arrPayMent = response.data;
      this.isActive = response.data[0].id;
    });
  }

  openPopup(type: string) {
    if (type == 'address') {
      this.addressComponent.isPopup = true;
      document.body.style.overflow = 'hidden';
      this.addressComponent.Getprovince();
      return;
    }
    this.voucherComponent.isPopup = true;
    document.body.style.overflow = 'hidden';
    this.voucherComponent.LoadPage();
  }

  LoadDataByVoucherComponent(data: voucherDtos) {
    this.voucher = data;
  }

  LoadAddress(data: addressModel) {
    this.address = data;
    this.LoadService(Number(data.idDistrict));
  }
  RemoveVoucher() {
    this.voucher = {} as voucherDtos;
  }
}
