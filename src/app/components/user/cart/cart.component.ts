import { Component, Inject, OnInit } from '@angular/core';
import { ICart, IChangeQuantity } from '../../../model/cart.model';
import { ICartRepository } from '../../../interface/cart.interface';
import { IAuth } from '../../../interface/auth.interface';
import { IUserToken } from '../../../model/user.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  constructor(
    @Inject('ICartRepository') private cartRepository: ICartRepository,
    @Inject('IAuth') private auth: IAuth
  ) {}
  isCart: boolean = false;
  arrCartItem: ICart[] = [];
  total: number = 0;
  ngOnInit(): void {
    this.LoadCart();
  }
  closePopup() {
    document.body.style.overflow = 'auto';
  }

  LoadCart() {
    this.cartRepository.getDataByToken().subscribe((res) => {
      this.arrCartItem = res.data;
      this.total = this.cartRepository.calculationTotal(res.data);
    });
  }
  StringSize(size: number): string {
    return this.cartRepository.convertStringFile(size);
  }

  RemoveItem(id: number) {
    this.cartRepository.deleteCart(id).subscribe((res) => {
      if (res.success) {
        this.LoadCart();
        return;
      }
    });
  }

  ChangeQuantity(id: number, type: string) {
    let model: IChangeQuantity = {
      type: type,
      id: id,
      idAccount: 0,
    };
    this.cartRepository.changeQuantity(model).subscribe((res) => {
      if (res) {
        this.LoadCart();
        return;
      }
    });
  }
}
