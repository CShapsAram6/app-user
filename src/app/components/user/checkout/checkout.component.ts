import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ICartRepository } from '../../../interface/cart.interface';
import { ICart, IChangeQuantity } from '../../../model/cart.model';
import { AddressComponent } from '../address/address.component';
import { PaymentService } from '../../../services/payment.service';
import { IPayMentDtos } from '../../../model/payments.model';
import { VoucherComponent } from '../voucher/voucher.component';
import { voucherDtos } from '../../../model/vouchers.model';
import { addressModel } from '../../../model/address.model';
import { OrderService } from '../../../services/order.service';
import {
  RequestGHN,
  requestServiceDelivery,
  responseGHN,
  responseServiceDelivery,
} from '../../../model/serviceDelivery.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IServiceOrder } from '../../../interface/serviceOrder.interface';
import { singleResponse } from '../../../model/response.model';
import { AddressService } from '../../../services/address.service';
import { IAuth } from '../../../interface/auth.interface';
import { IUserToken } from '../../../model/user.model';
import { forkJoin, map, mergeMap, Observable, of, tap } from 'rxjs';
import { IOrderRequest } from '../../../model/order.model';
import { IOrderRepository } from '../../../interface/order.interface';
import { VariantService } from '../../../services/variant.service';

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
    @Inject('IAuth') private auth: IAuth,
    @Inject('IOrderRepository') private orderRepository: IOrderRepository,
    private paymentService: PaymentService,
    private orderService: OrderService,
    private addressService: AddressService,
    private router: Router,
    private pramaster: ActivatedRoute,
    private variantService: VariantService
  ) {}
  arrCart: ICart[] = [];
  arrPayMent: IPayMentDtos[] = [];
  methodPayment: IPayMentDtos = {} as IPayMentDtos;
  isActive: number = 0;
  isService: number = 0;
  voucher: voucherDtos = {} as voucherDtos;
  address: addressModel = {} as addressModel;
  arrService: responseServiceDelivery[] = [];
  total: number = 0;
  tipDelivery: number = 0;
  disCount: number = 0;
  note: string = '';
  account: IUserToken = {} as IUserToken;
  ngOnInit(): void {
    this.LoadData();
  }

  LoadData() {
    this.LoadCart();
    this.LoadPayment();
    this.getAddress();
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
    let sesstion = sessionStorage.getItem('products');
    if (sesstion) {
      this.arrCart = JSON.parse(sesstion);
      if (this.arrCart.length > 0) {
        sessionStorage.removeItem('products');
        this.total = this.cartRepostory.calculationTotal(this.arrCart);
      }
    }
  }

  LoadPayment() {
    return this.paymentService.getData().subscribe((response) => {
      this.arrPayMent = response.data;
      this.isActive = response.data[0].id;
      this.methodPayment = response.data[0];
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
    if (data.discount === 0) return;
    this.calculationVoucher(data);
  }
  calculationVoucher(data: voucherDtos) {
    if (data.discountType.trim() == 'phần trăm') {
      this.disCount = Math.ceil((this.total * data.discount) / 100);
    } else {
      this.disCount = this.total - data.discount;
    }
  }

  getAddress() {
    let token: string = this.auth.getCookie('TokenUser');
    let user: IUserToken = this.auth.decodeToken(token);
    this.account = user;
    return this.addressService
      .getData(Number(user.Id))
      .subscribe((response) => {
        this.LoadAddress(response.data[0]);
      });
  }
  LoadAddress(data: addressModel) {
    this.address = data;
    // this.LoadService(Number(data.idDistrict));
    this.LoadTipDelivery(Number(data.idDistrict), data.idWard);
  }
  RemoveVoucher() {
    this.voucher = {} as voucherDtos;
    this.disCount = 0;
  }

  LoadTipDelivery(district_id: number, ward_id: string) {
    this.serviceRepostory
      .convertRequestGHN(district_id, ward_id)
      .subscribe((res) => {
        this.CalculationTipDelivery(res);
      });
  }

  CalculationTipDelivery(request: RequestGHN) {
    this.orderService
      .getTipDelivery(request)
      .subscribe((res: singleResponse<responseGHN>) => {
        let fee = res.data.service_fee.toString().substring(0, 2);
        this.tipDelivery = Number(fee);
      });
  }

  token: string = this.auth.getCookie('TokenUser');
  HandleButtonOrder() {
    const orderData: IOrderRequest = {
      voucherId: this.voucher.id,
      feeDelivery: this.tipDelivery,
      paymentMethodId: this.methodPayment.id,
      addressDelivery: this.address.address,
      phoneDelivery: this.address.phone,
      noteDelivery: this.note,
      orderItems: Object.values(this.arrCart).map((item) => ({
        idProduct: item.id,
        size: item.size,
        quantity: item.quantity,
      })),
    };
    // convert this information to request for order api
    console.log(
      this.address,
      this.arrCart,
      this.methodPayment.id,
      this.note,
      this.account,
      this.total,
      this.voucher
    );
    this.orderRepository.createOrder(orderData, this.token).subscribe(
      (res) => {
        console.log(res.data);
        if (this.methodPayment.id == 2) {
          window.location.href = res.data;
        }
        alert('Đặt hàng thành công');
        console.log(res);
        this.router.navigate(['account/purchase']);
      },
      (err) => {
        alert('Đặt hàng thất bại');
        console.log(err);
      }
    );
  }
  StringSize(size: number): string {
    return this.cartRepostory.convertStringFile(size);
  }
  ChangeRouterSingleProduct(id: number) {
    this.variantService.getIdProduct(id).subscribe((res) => {
      if (res.success) {
        this.router.navigate(['/single-product', res.data]);
      }
    });
  }
}
