import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { UserComponent } from './user.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddressComponent } from './address/address.component';
import { VoucherComponent } from './voucher/voucher.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectProductComponent } from './select-product/select-product.component';
import { CartComponent } from './cart/cart.component';
import { AppModule } from '../../app.module';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { ManageAddressComponent } from './manage-address/manage-address.component';
import { OrderComponent } from './order/order.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { CommentComponent } from './single-product/comment/comment.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    title: 'Trang chủ',
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'Trang chủ',
      },
      {
        path: 'cart',
        component: CartComponent,
        title: 'Giỏ hàng',
      },
      { path: 'shop', component: ShopComponent, title: 'Cửa hàng' },
      { path: 'check-out', component: CheckoutComponent, title: 'Thanh toán' },
      {
        path: 'account',
        component: AccountComponent,
        children: [
          { path: '', component: ProfileComponent, title: 'Hồ sơ' },
          {
            path: 'address',
            component: ManageAddressComponent,
            title: 'Địa chi',
          },
          {
            path: 'purchase',
            component: OrderComponent,
            title: 'Đơn hàng',
          },
          {
            path: 'forget-password',
            component: ForgetPasswordComponent,
            title: 'Thay đổi mật khẩu',
          },
        ],
      },
      {
        path: 'single-product/:id',
        component: SingleProductComponent,
        title: 'Sản phẩm chi tiết',
      },
    ],
  },
];
@NgModule({
  declarations: [
    HomeComponent,
    ShopComponent,
    CheckoutComponent,
    AddressComponent,
    VoucherComponent,
    SelectProductComponent,
    AccountComponent,
    ProfileComponent,
    ManageAddressComponent,
    OrderComponent,
    ForgetPasswordComponent,
    SingleProductComponent,
    CommentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class UserModule {}
