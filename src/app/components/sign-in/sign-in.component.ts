declare var google: any;
import { Component, Inject, OnInit } from '@angular/core';
import { clientId } from '../../environment/environment.bassic';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ISignInRequest, userByEmail } from '../../model/user.model';
import { IAuth } from '../../interface/auth.interface';
import { CartRepository } from '../../repository/cart.repository';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private authService: AuthService,
    @Inject('ICartRepository') private cart: CartRepository,
    @Inject('IAuth') private auth: IAuth
  ) { }

  loginForm = this.form.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  isForm: boolean = false;

  ngOnInit(): void {
    this.LoginByGoogle();
    this.LoadPage();
  }

  LoadPage() { }

  LoginByGoogle() {
    google.accounts.id.initialize({
      client_id: clientId,
      callback: (resp: any) => this.handleLogin(resp),
    });
    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'outline',
      size: 'large',
      shape: 'rectangular',
      width: 350,
      height: 200,
      logo_alignment: 'center',
      longtitle: true,
      text: 'continue_with',
    });
  }
  handleLogin(response: any) {
    if (!response) return;
    const payLoad: userByEmail = this.decodeToken(response.credential) as userByEmail;
    this.authService.signInWithEmail(payLoad).subscribe((res) => {
      if (res.data) {
        this.cart.addCartEnterRedis(res.data);
        return;
      } else {
        alert('fail');
      }
    })
  }
  // hash token
  private decodeToken(token: any) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  SumbitForm() {
    let date: ISignInRequest = this.auth.handleLogin(this.loginForm.value);
    this.authService.signIn(date).subscribe((res) => {
      if (res.data != "Không có token") {
        this.cart.addCartEnterRedis(res.data);
        return;
      }
    });
  }
}
