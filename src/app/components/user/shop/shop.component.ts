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
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IColorCart } from '../../../model/cart.model';
import { SharedService } from '../../../services/shared.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private categorySevice: CategorysService,
    @Inject('ICartRepository') private cartRepository: ICartRepository,
    private sharedService: SharedService,
    private toastrServices: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  dropdownOpen: boolean = false;
  isButton: boolean = true;
  arrCategorys: categoryDtos[] = [];
  products: productsUsingShop[] = [];
  page: number = 1;
  isCategory: number = 0;
  selectedColorIndices: number[] = [];
  selectedSizeIndices: number[] = [];
  nameSearch: string = '';
  isFilter: number = 0;

  ngOnInit(): void {
    this.router.events.subscribe((envent) => {
      if (envent instanceof NavigationEnd) {
        this.LoadSearch()
        if (!this.nameSearch) {
          this.loadData();
          return;
        }
        this.LoadProducts()
      }
    });
    this.LoadSearch()
    if (!this.nameSearch) {
      this.loadData();
      return;
    }
    this.LoadProducts()
  }

  LoadSearch() {
    this.route.queryParams.subscribe(params => {
      const name = params['name'];
      this.nameSearch = name;
    });
  }

  LoadProducts() {
    let form = new FormData();
    form.append("name", this.nameSearch);
    this.productService.searchProductsShop(form).subscribe((res) => {
      this.isButton = false;
      this.products = res.data;
      this.selectedColorIndices = this.products.map(() => 0);
      this.selectedSizeIndices = this.products.map(() => 0);
    })
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
  
  SeeMoreProdcuts(number_page: number) {
    this.isFilter = 0;
    this.page = ++number_page;
    this.LoadProduct(this.page);
  }

  GetProductsByIdCategory(id: number) {
    this.isFilter = 0;
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

  FilterProducts(action: number) {
    switch (action) {
      case 1:
        this.products.sort((a, b) => b.variant[0].price - a.variant[0].price)
        break;
      case 2:
        this.products.sort((a, b) => a.variant[0].price - b.variant[0].price)
        break;
    }
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
