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
import { ToastrService } from 'ngx-toastr';

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
    private variantService: VariantService,
    private toastr: ToastrService
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
    if(this.total >= data.min_Order_Value){
      if (data.discountType.trim() == 'percent') {
        this.disCount = Math.ceil((this.total * data.discount) / 100);
        if(this.disCount > data.max_Discount){
          this.disCount = data.max_Discount;
        }
      } else {
        this.disCount = data.discount;
      }
    }
    else{
      this.toastr.error('Tổng tiền hàng phải tối thiểu ' +  (data.min_Order_Value * 1000).toLocaleString() + '₫ mới được sử dụng voucher ' + data.name , 'Thông báo');
    }
  }

  getAddress() {
    const token = this.auth.getCookie('TokenUser');
    const user = this.auth.decodeToken(token) as IUserToken;
    this.account = user;

    this.addressService.getData(Number(user.Id)).subscribe((response) => {
      const primaryAddress = response.data?.find((item) => item.isPrimary);
      if (primaryAddress) {
        this.LoadAddress(primaryAddress);
      }
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

  SendEmail(id: number) {
    this.orderRepository.sendEmail(id).subscribe((res) => {
      console.log(res);
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
      orderItems: Object.values(this.arrCart).flatMap((item) =>
        item.colors.map((color) => ({
          idProduct: item.id,
          idProductColor: color.id,
          size: item.size,
          quantity: color.quantity,
        }))
      ),
    };

    console.log(
      // this.address,
      this.arrCart
      // this.methodPayment.id,
      // this.note,
      // this.account,
      // this.total,
      // this.voucher
    );
    this.orderRepository.createOrder(orderData, this.token).subscribe(
      (res) => {
        console.log(res.data.orderId);

        if (
          res.data ==
          'Số lượng sản phẩm đã đặt nhiều hơn số lượng sản phẩm đang có'
        ) {
          this.toastr.error('Số lượng sản phẩm đã đặt nhiều hơn số lượng sản phẩm đang có!', 'Thông báo');

        } else {
          console.log(res.data);
          //Xóa giỏ hàng
          orderData.orderItems.forEach((item) => {
            this.cartRepostory.deleteCart(item.idProduct).subscribe((res) => {
              if (res.success) {
                this.LoadCart();
              }
            });
          });
          //Chuyển qua thanh toán vnPay
          if (this.methodPayment.id == 2) {
            window.location.href = res.data.url;
            this.router.navigate(['account/purchase']);
            this.toastr.success('Đặt hàng thành công!', 'Thông báo');
            this.SendEmail(res.data.orderId);
          }
          if (this.methodPayment.id == 3) {
            window.location.href = res.data.url.orderurl;
            this.router.navigate(['account/purchase']);
            this.toastr.success('Đặt hàng thành công!', 'Thông báo');
            this.SendEmail(res.data.orderId);
          }
          if(this.methodPayment.id == 1){
            this.toastr.success('Đặt hàng thành công!', 'Thông báo');
            this.router.navigate(['account/purchase']);
            this.SendEmail(res.data.orderId);
          }

        }
      },
      (err) => {
        this.toastr.error('Đặt hàng thất bại!', 'Thông báo');
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
