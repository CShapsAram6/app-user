import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ICartRepository } from '../../../../interface/cart.interface';


@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrl: './shop-card.component.scss'
})
export class ShopCardComponent {
  constructor(
    @Inject('ICartRepository') private cartRepository: ICartRepository,
  ) { }
  @Input() products: any[] = [];
  @Input() selectedSizeIndices: any[] = [];
  @Input() selectedColorIndices: any[] = [];

  @Output() onClickEvent = new EventEmitter<{ colors: any, id: any, variant: any }>();

  AddToCart(colors: any, id: any, variant: any) {
    this.onClickEvent.emit( {colors, id, variant} );
  }

  StringSize(size: number): string {
    return this.cartRepository.convertStringFile(size);
  }
}
