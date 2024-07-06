import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { UserComponent } from './user.component';
import { CheckoutComponent } from './checkout/checkout.component';

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
  declarations: [HomeComponent, ShopComponent, CheckoutComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UserModule {}
