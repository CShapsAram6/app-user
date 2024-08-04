import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import {
  colorDtos,
  singleProductDto,
  variantDtos,
} from '../../../model/product.model';
import { CategorysService } from '../../../services/categorys.service';
import { ICartRepository } from '../../../interface/cart.interface';
import { IColorCart } from '../../../model/cart.model';
import { SharedService } from '../../../services/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss',
})
export class SingleProductComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private productServices: ProductService,
    private categoryServices: CategorysService,
    @Inject('ICartRepository') private cartRepository: ICartRepository,
    private sharedService: SharedService,
    private toastrServices: ToastrService
  ) {}
  idProducts: number = this.router.snapshot.params['id'];
  product: singleProductDto = {} as singleProductDto;
  category: string = '';
  isVariant: number = 0;
  isColor: number = 0;
  price: number = 0;
  link: string = '';
  isComment: number = 2;
  quantity: string = '1';
  variant: variantDtos = {} as variantDtos;
  color: colorDtos = {} as colorDtos;
  arrColor: IColorCart[] = [];
  colorCart: IColorCart = {} as IColorCart;
  ngOnInit(): void {
    this.LoadPage();
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;

    // Chỉ cho phép nhập số
    if (!/^[0-9]*$/.test(value)) {
      inputElement.value = value.replace(/[^0-9]/g, '');
    }

    // Không cho phép nhập quá 50
    if (parseInt(value, 10) > 50) {
      inputElement.value = '50';
    }
  }
  ChangeQuantity(type: string, item: IColorCart) {
    let index = this.arrColor.findIndex((x) => x.id == item.id);
    let currentQuantity = Number(this.quantity);

    if (type === 'plus') {
      if (currentQuantity < 50) {
        currentQuantity += 1;
      }
    } else {
      if (currentQuantity > 1) {
        currentQuantity -= 1;
      } else if (this.arrColor.length > 1) {
        this.RemoveItemColor(index);
        this.colorCart = this.arrColor[0];
        currentQuantity = this.colorCart.quantity;
      }
    }

    this.quantity = currentQuantity.toString();
    if (index !== -1 && this.arrColor[index]) {
      this.arrColor[index].quantity = currentQuantity;
    }
  }
  RemoveItemColor(index: number) {
    this.arrColor.splice(index, 1);
  }
  SelectColor(item: colorDtos) {
    let index = this.arrColor.findIndex((x) => x.id == item.id);
    if (index != -1) {
      this.arrColor[index].quantity += 1;
      return;
    }
    let itemColor: IColorCart = {
      id: item.id,
      code: item.code,
      quantity: 1,
    };
    this.colorCart = itemColor;
    this.arrColor.push(itemColor);
    this.quantity = '1';
  }

  ForcusItemColor(item: IColorCart) {
    this.quantity = item.quantity.toString();
  }
  LoadPage() {
    this.productServices.getById(this.idProducts).subscribe((res) => {
      this.product = res.data;
      this.isVariant = res.data.variant[0].id;
      this.isColor = res.data.colors[0].id;
      this.price = res.data.variant[0].price;
      this.link = res.data.images[0].link;
      this.variant = res.data.variant[0];
      this.color = res.data.colors[0];
      this.LoadCategory(res.data.category);
      this.SelectColor(res.data.colors[0]);
      this.colorCart = this.arrColor[0];
    });
  }
  LoadCategory(id: number) {
    this.categoryServices.getDataById(id).subscribe((res) => {
      this.category = res.name;
    });
  }

  StringSize(size: number): string {
    return this.cartRepository.convertStringFile(size);
  }
  AddToCart() {
    this.cartRepository
      .setData(this.variant, this.product, this.arrColor)
      .subscribe((res) => {
        if (res.success) {
          this.toastrServices.success(
            'Thêm vào giỏ hàng thành công',
            'Thông báo'
          );
          this.sharedService.emitButtonClick();
        }
      });
  }
}
