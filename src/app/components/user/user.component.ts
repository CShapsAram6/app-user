import { Component, Inject, OnInit } from '@angular/core';
import { CartRepository } from '../../repository/cart.repository';
import { ICartRepository } from '../../interface/cart.interface';
import { ICartLocal } from '../../model/cart.model';

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

  // list products in local
  arrayProduct: ICartLocal[] = [];
  ngOnInit(): void {
    this.LoadProduct();
  }

  LoadProduct(): void {
    this.cartRepository.getCart().subscribe((res) => {
      if (res.sussess) {
        this.arrayProduct = res.data;
        this.countNumberLoacal = res.data.length;
        if (res.data.length == 0) {
          this.countNumberLoacal = 0;
          return;
        }
      }
    });
  }
}
