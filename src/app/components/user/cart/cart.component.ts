import { Component, Inject, OnInit } from '@angular/core';
import { ICart } from '../../../model/cart.model';
import { ICartRepository } from '../../../interface/cart.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  constructor(
    @Inject('ICartRepository') private cartRepository: ICartRepository
  ) {}
  isCart: boolean = false;
  arrCartItem: ICart[] = [];
  ngOnInit(): void {
    this.LoadCart();
  }

  closePopup() {
    document.body.style.overflow = 'auto';
  }

  LoadCart() {
    this.cartRepository.getData().subscribe((res) => {
      this.arrCartItem = res.data;
    });
  }
}
