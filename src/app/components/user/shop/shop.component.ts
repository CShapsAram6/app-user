import { Component, Inject, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import {
  colorDtos,
  productsUsingShop,
  variantDtos,
} from '../../../model/product.model';
import { CategorysService } from '../../../services/categorys.service';
import { categoryDtos } from '../../../model/categorys.model';
import { ICartRepository } from '../../../interface/cart.interface';
import { Router } from '@angular/router';
import { IColorCart } from '../../../model/cart.model';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private categorySevice: CategorysService,
    @Inject('ICartRepository') private cartRepository: ICartRepository
  ) {}
  dropdownOpen: boolean = false;
  isButton: boolean = true;
  arrCategorys: categoryDtos[] = [];
  products: productsUsingShop[] = [];
  page: number = 1;
  isCategory: number = 0;
  selectedColorIndices: number[] = [];
  selectedSizeIndices: number[] = [];

  ngOnInit(): void {
    this.loadData();
  }
  async loadData(): Promise<void> {
    await Promise.all([
      new Promise<void>((resolve) => {
        this.LoadCategory();
        resolve();
      }),
      new Promise<void>((resolve) => {
        this.LoadProduct(this.page);
        resolve();
      }),
    ]);

    // Xử lý sau khi cả hai hàm đã hoàn thành
  }
  LoadProduct(number_page: number) {
    this.productService.getUsingShop(number_page).subscribe((res) => {
      if (res.data.length == 0) {
        this.isButton = false;
        return;
      }
      res.data.forEach((element) => {
        this.products.push(element);
      });
      this.selectedColorIndices = this.products.map(() => 0);
      this.selectedSizeIndices = this.products.map(() => 0);
    });
  }
  LoadCategory() {
    this.categorySevice.getData().subscribe((response) => {
      this.arrCategorys = response.data;
    });
  }
  StringSize(size: number): string {
    return this.cartRepository.convertStringFile(size);
  }
  SeeMoreProdcuts(number_page: number) {
    this.page = ++number_page;
    this.LoadProduct(this.page);
  }

  GetProductsByIdCategory(id: number) {
    if (id == 0) {
      this.products = [];
      this.isButton = true;
      this.LoadProduct(1);
      this.page = 1;
      return;
    }
    this.productService.getByIdCategoryShop(id).subscribe((res) => {
      this.isButton = false;
      this.products = res.data;
    });
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

    this.cartRepository.setCartShop(
      variant,
      [colorCart],
      this.products[productIndex]
    );
  }
}
