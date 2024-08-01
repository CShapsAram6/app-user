import { Component, Inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { singleResponse } from '../../model/response.model';
import { IAuth } from '../../interface/auth.interface';
import { AuthService } from '../../services/auth.service';
import { IUserToken } from '../../model/user.model';
import { ICartRepository } from '../../interface/cart.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isGroupBtn: boolean = false;
  fullName: string = '';
  total: number = 0;
  constructor(
    @Inject('IAuth') private auth: IAuth,
    @Inject('ICartRepository') private cartRepository: ICartRepository,
    private userSevices: AuthService
  ) {}
  ngOnInit(): void {
    this.LoadUser();
    this.LoadCart();
  }
  LoadUser() {
    let token = this.auth.getCookie('TokenUser');
    if (token) this.isGroupBtn = true;
    let user: IUserToken = this.auth.decodeToken(token);
    this.userSevices.GetNameUser(Number(user.Id)).subscribe((res) => {
      this.fullName = res.data;
    });
  }

  LoadCart() {
    this.cartRepository.getDataByToken().subscribe((res) => {
      this.total = this.cartRepository.calculationTotal(res.data);
    });
  }
}
