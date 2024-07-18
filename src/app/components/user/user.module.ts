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
      { path: 'shop', component: ShopComponent, title: 'Cửa hàng' },
      { path: 'check-out', component: CheckoutComponent, title: 'Thanh toán' },
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
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}
