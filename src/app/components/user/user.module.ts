import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { UserComponent } from './user.component';

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
    ],
  },
];
@NgModule({
  declarations: [HomeComponent, ShopComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UserModule {}
