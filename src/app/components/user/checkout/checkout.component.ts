import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ICartRepository } from '../../../interface/cart.interface';
import { ICart } from '../../../model/cart.model';
import { AddressComponent } from '../address/address.component';
import { PaymentService } from '../../../services/payment.service';
import { IPayMentDtos } from '../../../model/payments.model';
import { VoucherComponent } from '../voucher/voucher.component';
import { voucherDtos } from '../../../model/vouchers.model';

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
    private paymentService: PaymentService
  ) {}
  arrCart: ICart[] = [];
  arrPayMent: IPayMentDtos[] = [];
  isActive: number = 0;
  voucher: voucherDtos = {} as voucherDtos;
  ngOnInit(): void {
    this.LoadCart();
    this.LoadPayment();
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
  RemoveVoucher() {
    this.voucher = {} as voucherDtos;
  }
}
