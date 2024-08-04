import { Component, Inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { singleResponse } from '../../model/response.model';
import { IAuth } from '../../interface/auth.interface';
import { AuthService } from '../../services/auth.service';
import { IUserToken } from '../../model/user.model';
import { ICartRepository } from '../../interface/cart.interface';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isGroupBtn: boolean = false;
  fullName: string = '';
  total: number = 0;
  isMenu: boolean = false;
  constructor(
    @Inject('IAuth') private auth: IAuth,
    @Inject('ICartRepository') private cartRepository: ICartRepository,
    private userSevices: AuthService,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {
    this.sharedService.buttonClicked$.subscribe(() => {
      this.LoadUser();
      this.LoadCart();
    });
    this.LoadUser();

    this.LoadCart();
  }
  LoadUser() {
    let token = this.auth.getCookie('TokenUser');
    this.isGroupBtn = token ? true : false;
    if (!token) {
      return;
    }
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
