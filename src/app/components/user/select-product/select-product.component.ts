import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import {
  colorDtos,
  singleProductDto,
  variantDtos,
} from '../../../model/product.model';
import { CategorysService } from '../../../services/categorys.service';
import { categoryDtos } from '../../../model/categorys.model';
import { ICartRepository } from '../../../interface/cart.interface';
import { UserComponent } from '../user.component';
import { IColorCart } from '../../../model/cart.model';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrl: './select-product.component.scss',
})
export class SelectProductComponent implements OnInit {
  @ViewChild(UserComponent) userComponent!: UserComponent;
  constructor(
    private productService: ProductService,
    private categorysService: CategorysService,
    @Inject('ICartRepository') private cartRepository: ICartRepository
  ) {}
  data: number = 0;
  isPopup: boolean = false;
  singleProduct: singleProductDto = {} as singleProductDto;
  isVariant: number = 0;
  isColor: number = 0;
  price: number = 0;
  link: string = '';

  category: categoryDtos = {} as categoryDtos;
  variant: variantDtos = {} as variantDtos;
  color: colorDtos = {} as colorDtos;

  ngOnInit(): void {}

  LoadPage(id: number) {
    this.productService.getById(id).subscribe((res) => {
      this.singleProduct = res.data;
      this.isVariant = res.data.variant[0].id;
      this.isColor = res.data.colors[0].id;
      this.price = res.data.variant[0].price;
      this.link = res.data.images[0].link;
      this.LoadCategory(res.data.category);
      this.variant = res.data.variant[0];
      this.color = res.data.colors[0];
    });
  }

  LoadCategory(id: number) {
    this.categorysService.getDataById(id).subscribe((response) => {
      this.category = response;
    });
  }

  closePopup() {
    document.body.style.overflow = 'auto';
  }

  AddToCart() {
    // console.log(this.variant, this.singleProduct);
    let arrColor: IColorCart[] = [];
    
    this.cartRepository.setData(this.variant, this.singleProduct, arrColor);
    // this.userComponent.countNumberLoacal = 1;
  }
  StringSize(size: number): string {
    return this.cartRepository.convertStringFile(size);
  }
}
