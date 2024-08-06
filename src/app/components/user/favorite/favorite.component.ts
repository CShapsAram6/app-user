import { WishListService } from './../../../services/wishlist.service';
import { Component, Input } from '@angular/core';
import { productsUsingShop } from '../../../model/product.model';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent {
  products: productsUsingShop[] = [];
  selectedColorIndices: number[] = [];
  selectedSizeIndices: number[] = [];

  constructor(private wishListService: WishListService) { }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    console.log('loadData được gọi');
    this.wishListService.getData().subscribe((res) => {
      console.log('Dữ liệu được nhận:', res);
      this.products = res.data;
      console.log('Sản phẩm được gán:', this.products);
      this.processData();
    }, (error) => {
      console.log('Lỗi khi nhận dữ liệu:', error);
    });
  }

  processData() {
    console.log('processData được gọi');
    this.selectedColorIndices = Array(this.products.length).fill(0);
    this.selectedSizeIndices = Array(this.products.length).fill(0);
    console.log('Mảng màu và kích thước được tạo:', this.selectedColorIndices, this.selectedSizeIndices);
  }
}
