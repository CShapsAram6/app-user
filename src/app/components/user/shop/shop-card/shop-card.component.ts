import { token } from './../../../../environment/environment.bassic';
import { WishListService } from './../../../../services/wishlist.service';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ICartRepository } from '../../../../interface/cart.interface';
import { ProductForWishList } from '../../../../model/wishList.model';
import { colorDtos, variantDtos } from '../../../../model/product.model';
import { IColorCart } from '../../../../model/cart.model';
import { SharedService } from '../../../../services/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrl: './shop-card.component.scss',
})
export class ShopCardComponent {
  constructor(
    @Inject('ICartRepository') private cartRepository: ICartRepository,
    private wishListService: WishListService,
    private sharedService: SharedService,
    private toastrServices: ToastrService,
  ) {}
  @Input() products: any[] = [];
  @Input() selectedSizeIndices: any[] = [];
  @Input() selectedColorIndices: any[] = [];
  productForWishList: ProductForWishList[] = [];

  // @Output() onClickEvent = new EventEmitter<{
  //   colors: any;
  //   id: any;
  //   variant: any;
  // }>();

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


  // AddToCart(colors: any, id: any, variant: any) {
  //   this.onClickEvent.emit({ colors, id, variant });
  // }

  StringSize(size: number): string {
    return this.cartRepository.convertStringFile(size);
  }

  LoadProductForWishList() {
    const token= this.wishListService.getToken()
    if(!token) return
    this.wishListService.getProductForWishList().subscribe(
      (res) => {
        if (res.data) {
          this.productForWishList = res.data;
        } else {
          console.error('Không có dữ liệu trả về');
        }
      },
      (error) => {
        console.error('Lỗi khi gọi API:', error);
      }
    );
  }

  AddProductToWishList(id: number) {
    this.wishListService.postWishList(id).subscribe(
      (res) => {
        this.LoadProductForWishList();
      },
      (error) => {
        console.error('Lỗi khi thêm sản phẩm vào danh sách yêu thích:', error);
      }
    );
  }

  DeleteProductToWishList(id: number) {
    this.wishListService.deleteWishList(id).subscribe(
      (res) => {
        this.LoadProductForWishList();
      },
      (error) => {
        console.error('Lỗi khi xoá sản phẩm yêu thích:', error);
      }
    );
  }

  AddToCart(colors: colorDtos, idProducts: number, variant: variantDtos) {
    const productIndex = this.products.findIndex(
      (product) => product.id === idProducts
    );

    if (productIndex === -1) {
      console.error('Product not found');
      return;
    }

    const colorCart: IColorCart = {
      id: colors.id,
      code: colors.code,
      quantity: 1,
    };

    this.cartRepository
      .setCartShop(variant, [colorCart], this.products[productIndex])
      .subscribe((res) => {
        if (res.success) {
          this.sharedService.emitButtonClick();
          this.toastrServices.success(
            'Thêm vào giỏ hàng thành công',
            'Thành công'
          );
        }
      });
  }
}
