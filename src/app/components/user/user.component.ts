import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ICartRepository } from '../../interface/cart.interface';
import { forkJoin, Observable, of, tap } from 'rxjs';
import { singleResponse } from '../../model/response.model';
import { CartComponent } from './cart/cart.component';
import { IAuth } from '../../interface/auth.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  @ViewChild(CartComponent) cartComponent!: CartComponent;

  constructor(
    @Inject('ICartRepository') private cartRepository: ICartRepository,
    @Inject('IAuth') private auth: IAuth
  ) {}
  isNav: boolean = false;
  isCart: boolean = false;
  isSignIn: boolean = false;
  countNumberLoacal: number = 0;
  isGroupBtn: boolean = false;

  ngOnInit(): void {
    forkJoin([this.LoadProduct(), this.LoadUser()]).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  LoadProduct() {
    return this.cartRepository.getData().pipe(
      tap((res) => {
        if (res.sussess) {
          this.countNumberLoacal = res.data.length;
          if (res.data.length == 0) {
            this.countNumberLoacal = 0;
            return;
          }
        }
      })
    );
  }
  LoadUser(): Observable<singleResponse<any>> {
    let token = this.auth.getCookie('TokenUser');
    if (token) {
      this.isGroupBtn = true;
    }
    return of({ data: token, sussess: true, message: 'ok' });
  }

  OpenPopupCart() {
    this.cartComponent.isCart = true;
    document.body.style.overflow = 'hidden';
    this.cartComponent.ngOnInit();
  }

  // signup
  isSignUp: boolean = false;
  SignIn(){
    this.isSignUp = true
  }
  DKDN(){
    this.isSignUp = false;
    this.isSignIn = true;
  }
  DNDK(){
    this.isSignIn = false;
    this.isSignUp = true;
  }
  //end signup
}
