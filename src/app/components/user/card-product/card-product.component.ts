import { AuthRepository } from './../../../repository/auth.repository';
import { token } from './../../../environment/environment.bassic';
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
    private wishListService: WishListService,
    private authRepository: AuthRepository
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
  token = this.authRepository.getCookie("TokenUser") ?? null

  LoadProductForWishList() {
    console.log(this.token)
    if(!this.token) return
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
}
