import { WishListService } from './../../../../services/wishlist.service';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ICartRepository } from '../../../../interface/cart.interface';
import { ProductForWishList } from '../../../../model/wishList.model';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrl: './shop-card.component.scss',
})
export class ShopCardComponent {
  constructor(
    @Inject('ICartRepository') private cartRepository: ICartRepository,
    private wishListService: WishListService
  ) {}
  @Input() products: any[] = [];
  @Input() selectedSizeIndices: any[] = [];
  @Input() selectedColorIndices: any[] = [];
  productForWishList: ProductForWishList[] = [];

  @Output() onClickEvent = new EventEmitter<{
    colors: any;
    id: any;
    variant: any;
  }>();

  ngOnInit(): void {
    this.LoadProductForWishList();
  }
  checkProductIsWishList: boolean = false
  CheckIsWishList(id : number): boolean {
    for (let i = 0; i < this.productForWishList.length; i++) {
      if(this.productForWishList[i].productId === id) {
        this.checkProductIsWishList = true
        return this.checkProductIsWishList
      }
    }
    return false;
  }


  AddToCart(colors: any, id: any, variant: any) {
    this.onClickEvent.emit({ colors, id, variant });
  }

  StringSize(size: number): string {
    return this.cartRepository.convertStringFile(size);
  }

  LoadProductForWishList() {
    this.wishListService.getProductForWishList().subscribe(
      (res) => {
        if (res.data) {
          console.log('Dữ liệu trả về:', res.data);
          this.productForWishList = res.data;
          console.log('ProductForWishList:', this.productForWishList);
        } else {
          console.error('Không có dữ liệu trả về');
        }
      },
      (error) => {
        console.error('Lỗi khi gọi API:', error);
      }
    );
  }
}