import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { NotFoundError } from 'rxjs';
import { ForgetpassComponent } from './components/forgetpass/forgetpass.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./components/user/user.module').then((m) => m.UserModule),
  },
  { path: 'sign-in', component: SignInComponent, title: 'Đăng nhập' },
  { path: 'sign-up', component: SignUpComponent, title: 'Đăng ký' },
  { path: 'forgetpass', component: ForgetpassComponent, title: 'Quên mật khẩu' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
