import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { singleProductDto } from '../../../model/product.model';
import { CategorysService } from '../../../services/categorys.service';
import { response } from 'express';
import { categoryDtos } from '../../../model/categorys.model';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrl: './select-product.component.scss',
})
export class SelectProductComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private categorysService: CategorysService
  ) {}
  data: number = 0;
  isPopup: boolean = false;
  singleProduct: singleProductDto = {} as singleProductDto;
  isVariant: number = 0;
  price: number = 0;
  link: string = '';

  category: categoryDtos = {} as categoryDtos;

  ngOnInit(): void {
    this.LoadPage(this.data);
  }

  LoadPage(id: number) {
    this.productService.getById(id).subscribe((res) => {
      this.singleProduct = res.data;
      this.isVariant = res.data.variant[0].id;
      this.price = res.data.variant[0].price;
      this.link = res.data.images[0].link;
      this.LoadCategory(res.data.category);
    });
  }

  LoadCategory(id: number) {
    this.categorysService.getDataById(id).subscribe((response) => {
      this.category = response;
      console.log(response);
    });
  }

  closePopup() {
    document.body.style.overflow = 'auto';
  }
}
