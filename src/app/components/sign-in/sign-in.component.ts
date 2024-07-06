declare var google: any;
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  ngOnInit(): void {
    this.LoginByGoogle();
  }

  LoginByGoogle() {
    google.accounts.id.initialize({
      client_id:
        '466166882774-1kndmudl43mekptaltqbnaurdapp7mr0.apps.googleusercontent.com',
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
}
