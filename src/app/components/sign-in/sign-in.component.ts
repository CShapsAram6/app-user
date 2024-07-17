declare var google: any;
import { Component, OnInit } from '@angular/core';
import { clientId } from '../../environment/environment.bassic';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { auth, ISignInRequest } from '../../model/user.model';
import { PaymentService } from '../../services/payment.service';
import e from 'express';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private authService: AuthService,
    private payMentServices: PaymentService
  ) {}

  loginForm = this.form.group({
    userName: [''],
    password: [''],
  });

  ngOnInit(): void {
    this.LoginByGoogle();
    this.LoadPage();
  }

  LoadPage() {
    let token: string = auth.get('TokenUser') as string;
    this.payMentServices.getData(token).subscribe((res) => {
      console.log(res);
    });
  }

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
    const payLoad = this.decodeToken(response.credential);
    console.log(response);
  }
  private decodeToken(token: any) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  SumbitForm() {
    let date: ISignInRequest = auth.handleLogin(this.loginForm.value);
    this.authService.signIn(date).subscribe((res) => {
      if (res.data) {
        alert('ok');
        window.location.reload();
        return;
      } else {
        alert('fail');
      }
    });
  }
}
