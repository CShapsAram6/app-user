import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { IRelateToProductsDto } from '../../../../model/product.model';

@Component({
  selector: 'app-relate-to-products',
  templateUrl: './relate-to-products.component.html',
  styleUrl: './relate-to-products.component.scss',
})
export class RelateToProductsComponent implements OnInit {
  constructor(private productsServices: ProductService) {}
  arrProducts: IRelateToProductsDto[] = [];
  ngOnInit(): void {
    this.LoadProducts(1);
  }

  LoadProducts(id: number) {
    this.productsServices.getRelateToProducts(id).subscribe((res) => {
      if (res.success) {
        this.arrProducts = res.data;
      }
    });
  }
}
