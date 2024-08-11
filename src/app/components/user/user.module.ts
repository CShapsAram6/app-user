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
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { BlogComponent } from './blog/blog.component';
import { CardProductComponent } from './card-product/card-product.component';
import { CookieService } from 'ngx-cookie-service';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { ShopCardComponent } from './shop/shop-card/shop-card.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentErrorComponent } from './payment-error/payment-error.component';

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
            path: 'order-detail/:id',
            component: OrderDetailComponent,
            title: 'Chi tiết đơn hàng',
          },
          {
            path: 'forget-password',
            component: ForgetPasswordComponent,
            title: 'Thay đổi mật khẩu',
          },
          {
            path: 'favourite',
            component: FavoriteComponent,
            title: 'Thay đổi mật khẩu',
          },
        ],
      },
      {
        path: 'single-product/:id',
        component: SingleProductComponent,
        title: 'Sản phẩm chi tiết',
      },
      {
        path: 'blog/:page',
        component: BlogComponent,
        title: 'Bài viết',
      },
      {
        path:'blog-detail/:id',
        component: BlogDetailComponent,
        title:'Bài viết chi tiết',
      },
      {
        path:'payment-success',
        component: PaymentSuccessComponent,
        title:'Thanh toán đơn hàng thành công',
      },
      {
        path:'payment-error',
        component: PaymentErrorComponent,
        title:'Thanh toán đơn hàng thất bại',
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
    OrderDetailComponent,
    FavoriteComponent,
    BlogComponent,
    CardProductComponent,
    BlogDetailComponent,
    ShopCardComponent,
    PaymentSuccessComponent,
    PaymentErrorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [CookieService, provideAnimations(), provideToastr()],
})
export class UserModule {}
