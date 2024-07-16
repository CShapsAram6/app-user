import { Component, Inject, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { singleResponse } from '../../../model/response.model';
import { productsDtos } from '../../../model/product.model';
import { CartRepository } from '../../../repository/cart.repository';
import { ICartRepository } from '../../../interface/cart.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  list: any[] = [1, 2, 3, 4];
  blog: any[] = [1, 1, 1];

  page: number = 1;

  products: productsDtos[] = [];

  constructor(
    private productService: ProductService,
    @Inject('ICartRepository') private cartRepository: ICartRepository
  ) {}
  ngOnInit(): void {
    this.LoadProduct(this.page);
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

  AddToCart(item: productsDtos) {
    this.cartRepository.setCart(item);
  }
}
