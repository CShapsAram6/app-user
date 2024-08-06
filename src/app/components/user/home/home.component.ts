import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { singleResponse } from '../../../model/response.model';
import { productsDtos } from '../../../model/product.model';
import { ICartRepository } from '../../../interface/cart.interface';
import { SelectProductComponent } from '../select-product/select-product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  [x: string]: any;
  list: any[] = [1, 2, 3, 4];
  blog: any[] = [1, 1, 1];
  type: number = 1;

  @ViewChild(SelectProductComponent) selecProducts!: SelectProductComponent;
  page: number = 1;
  products: productsDtos[] = [];
  topProducts: productsDtos[] = [];
  isPopup: boolean = false;

  constructor(
    private productService: ProductService,
    @Inject('ICartRepository') private cartRepository: ICartRepository
  ) {}
  ngOnInit(): void {
    this.LoadProduct(this.page);
    this.LoadTopProducts(this.type);
  }

  LoadTopProducts(type: number) {
    this.productService
      .getTopProducts(type)
      .subscribe((res: singleResponse<productsDtos[]>) => {
        this.topProducts = res.data;
      });
  }

  LoadProduct(page: number) {
    this.productService
      .getData(page.toString())
      .subscribe((res: singleResponse<productsDtos[]>) => {
        if (res.data.length == 0) {
          console.log(res);
          return;
        }
        this.products.push(...res.data);
      });
  }

  SeeMoreProducts(page: number) {
    this.page = page + 1;
    this.LoadProduct(this.page);
  }

  GetProducts(id: number) {
    this.selecProducts.LoadPage(id);
    this.selecProducts.isPopup = true;
    document.body.style.overflow = 'hidden';
  }
}
