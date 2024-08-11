import { Component, Input, OnInit } from '@angular/core';
import { productsDtos } from '../../../model/product.model';
import { WishListService } from '../../../services/wishlist.service';
import { ProductForWishList } from '../../../model/wishList.model';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss',
})
export class CardProductComponent implements OnInit {
  @Input() product: productsDtos = {} as productsDtos;
  constructor(
    private wishListService: WishListService
  ) {}
  ngOnInit(): void {
    this.LoadProductForWishList();
  }

  productForWishList: ProductForWishList[] = [];

  CheckIsWishList(id : number): boolean {
    for (let i = 0; i < this.productForWishList.length; i++) {
      if(this.productForWishList[i].productId === id) {
        return true
      }
    }
    return false;
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

  AddProductToWishList(id: number) {
    this.wishListService.postWishList(id).subscribe(
      (res) => {
        console.log('Thêm sản phẩm vào danh sách yêu thích thành công!');
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
        console.log('Xoá sản phẩm yêu thích thành công!');
        this.LoadProductForWishList();
      },
      (error) => {
        console.error('Lỗi khi xoá sản phẩm yêu thích:', error);
      }
    );
  }
}
