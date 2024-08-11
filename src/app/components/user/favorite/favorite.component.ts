import { WishListService } from './../../../services/wishlist.service';
import { Component, Input } from '@angular/core';
import { productsUsingShop } from '../../../model/product.model';
import { ProductForWishList } from '../../../model/wishList.model';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent {
  products: productsUsingShop[] = [];
  selectedColorIndices: number[] = [];
  selectedSizeIndices: number[] = [];
  productForWishList: ProductForWishList[] = [];

  constructor(private wishListService: WishListService) { }
  page = 1;

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.wishListService.getData(this.page).subscribe((res) => {

      this.products = res.data;
      this.processData();
    }, (error) => {
      console.log('Lỗi khi nhận dữ liệu:', error);
    });
  }

  processData() {
    this.selectedColorIndices = Array(this.products.length).fill(0);
    this.selectedSizeIndices = Array(this.products.length).fill(0);
  }

  SeeMoreProdcuts(number_page: number) {
    this.page = ++number_page;
    this.loadData();
  }

  
}
