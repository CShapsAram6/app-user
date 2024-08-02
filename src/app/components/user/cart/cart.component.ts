import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ICart, IChangeQuantity } from '../../../model/cart.model';
import { ICartRepository } from '../../../interface/cart.interface';
import { IAuth } from '../../../interface/auth.interface';
import { VariantService } from '../../../services/variant.service';
import { Router } from '@angular/router';
import { RelateToProductsComponent } from './relate-to-products/relate-to-products.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  @ViewChild(RelateToProductsComponent)
  relateToProductsComponent!: RelateToProductsComponent;
  constructor(
    @Inject('ICartRepository') private cartRepository: ICartRepository,
    @Inject('IAuth') private auth: IAuth,
    private variantService: VariantService,
    private router: Router
  ) {}
  arrCartItem: ICart[] = [];
  total: number = 0;
  isPopup: number = 0;
  index: number = 0;
  selectedColorIndices: number[] = [];

  arrSelectProdcuts: ICart[] = [];
  isAll: boolean = false;

  ngOnInit(): void {
    this.LoadCart();
  }
  closePopup() {
    document.body.style.overflow = 'auto';
  }
  ChangeRouterSingleProduct(id: number) {
    this.variantService.getIdProduct(id).subscribe((res) => {
      if (res.success) {
        this.router.navigate(['/single-product', res.data]);
      }
    });
  }
  LoadCart() {
    this.cartRepository.getDataByToken().subscribe((res) => {
      this.arrCartItem = res.data;
      this.selectedColorIndices = this.arrCartItem.map(() => 0);
    });
  }
  StringSize(size: number): string {
    return this.cartRepository.convertStringFile(size);
  }

  RemoveItem(id: number) {
    this.cartRepository.deleteCart(id).subscribe((res) => {
      if (res.success) {
        this.LoadCart();
      }
    });
  }

  ChangeQuantity(idColor: number, type: string, id: number): void {
    const request: IChangeQuantity = {
      type,
      id,
      idAccount: 0,
      idColor,
    };

    this.cartRepository.changeQuantity(request).subscribe((res) => {
      if (res.success) {
        this.LoadPage();
      }
    });
  }

  UpdateQuantityInClient(res: ICart[]): void {
    this.arrSelectProdcuts = res.filter((item) =>
      this.arrSelectProdcuts.some((selected) => selected.id === item.id)
    );
  }

  LoadPage() {
    this.cartRepository.getDataByToken().subscribe((res) => {
      this.arrCartItem = res.data;
      this.UpdateQuantityInClient(res.data);
      this.total = this.cartRepository.calculationTotal(this.arrSelectProdcuts);
    });
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
    if (value.trim() == '') {
      inputElement.value = '1';
    }
  }

  SelectAll(): void {
    if (this.arrSelectProdcuts.length === this.arrCartItem.length) {
      this.arrSelectProdcuts = [];
    } else {
      this.arrSelectProdcuts = [...this.arrCartItem];
    }
    this.total = this.cartRepository.calculationTotal(this.arrSelectProdcuts);
  }

  SelectItem(item: ICart) {
    const isCheck = this.CheckedItem(item.id);
    const index = this.arrSelectProdcuts.findIndex((x) => x.id === item.id);

    if (isCheck) {
      this.arrSelectProdcuts.splice(index, 1);
    } else {
      this.arrSelectProdcuts.push(item);
    }

    this.isAll = this.arrCartItem.length === this.arrSelectProdcuts.length;
    this.total = this.cartRepository.calculationTotal(this.arrSelectProdcuts);
  }

  CheckedItem(id: number): boolean {
    const isCheck: boolean = this.arrSelectProdcuts.some(
      (item) => item.id === id
    );
    this.total = this.cartRepository.calculationTotal(this.arrSelectProdcuts);
    return isCheck;
  }

  NextPageCheckOut() {
    let products: string = JSON.stringify(this.arrSelectProdcuts);
    sessionStorage.setItem('products', products);
    this.router.navigate(['/check-out']);
  }

  GetPrroductsRelateTo(id: number) {
    this.relateToProductsComponent.LoadProducts(id);
  }
}
