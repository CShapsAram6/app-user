import { Component, Inject, OnInit } from '@angular/core';
import { CartRepository } from '../../repository/cart.repository';
import { ICartRepository } from '../../interface/cart.interface';
import { ICartLocal } from '../../model/cart.model';
import { auth } from '../../model/user.model';
import { forkJoin, Observable, of, tap } from 'rxjs';
import { singleResponse } from '../../model/response.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  constructor(
    @Inject('ICartRepository') private cartRepository: ICartRepository
  ) {}
  isNav: boolean = false;
  isCart: boolean = false;
  items: any[] = [1, 2, 3, 4, 1, 1, 1, 1];
  isSignIn: boolean = false;
  countNumberLoacal: number = 0;
  isGroupBtn: boolean = false;

  // list products in local
  arrayProduct: ICartLocal[] = [];
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
    return this.cartRepository.getCart().pipe(
      tap((res) => {
        if (res.sussess) {
          this.arrayProduct = res.data;
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
    let token = auth.get('TokenUser');
    if (token) {
      this.isGroupBtn = true;
    }
    return of({ data: token, sussess: true, message: 'ok' });
  }
}
