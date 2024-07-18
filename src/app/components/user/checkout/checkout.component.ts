import { Component, Inject, OnInit } from '@angular/core';
import { ICartRepository } from '../../../interface/cart.interface';
import { ICartLocal } from '../../../model/cart.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  constructor(
    @Inject('ICartRepository') private cartRepostory: ICartRepository
  ) {}
  isPopup: boolean = false;
  arrCart: ICartLocal[] = [];
  ngOnInit(): void {
    this.LoadCart();
  }

  LoadCart() {}
}
