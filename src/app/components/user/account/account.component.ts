import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAuth } from '../../../interface/auth.interface';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  constructor(
    private router: Router,
    @Inject('IAuth') private auth: IAuth,
    private cookieService: CookieService,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {
    this.Authentication();
  }
  Authentication() {
    let token = this.auth.getCookie('TokenUser');
    if (token == null) this.router.navigate(['/sign-in']);
  }
  SignOut() {
    this.cookieService.delete('TokenUser');
    this.router.navigate(['/']);
    this.sharedService.emitButtonClick();
    console.log("checkout")
  }
}
