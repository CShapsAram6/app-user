import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { debounceTime, Observable, of } from 'rxjs';
import { singleResponse } from '../../model/response.model';
import { IAuth } from '../../interface/auth.interface';
import { AuthService } from '../../services/auth.service';
import { IUserToken } from '../../model/user.model';
import { ICartRepository } from '../../interface/cart.interface';
import { SharedService } from '../../services/shared.service';
import { FormControl } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { productsDtos } from '../../model/product.model';
import { Router } from '@angular/router';
import { query } from 'express';
import { CategorysService } from '../../services/categorys.service';
import { categoryDtos } from '../../model/categorys.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isGroupBtn: boolean = false;
  fullName: string = '';
  total: number = 0;
  isMenu: boolean = false;
  inputControl = new FormControl();
  productsSearch: productsDtos[] = []
  name: string = '';
  category: categoryDtos[] = [];
  isDropDown: boolean = false;
  constructor(
    @Inject('IAuth') private auth: IAuth,
    @Inject('ICartRepository') private cartRepository: ICartRepository,
    private userSevices: AuthService,
    private sharedService: SharedService,
    private productsServices: ProductService,
    private router: Router,
    private categoryServices: CategorysService
  ) { }
  ngOnInit(): void {
    this.sharedService.buttonClicked$.subscribe(() => {
      this.LoadUser();
      this.LoadCart();
    });
    this.LoadUser();

    this.LoadCart();

    this.ChangeSearch();
    this.LoadCategorys()
  }

  ChangeSearch() {
    this.inputControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe((value) => {
        this.LoadSearch(value)
        this.name = value;
      });
  }

  LoadCategorys() {
    this.categoryServices.getData().subscribe((res) => {
      if (res.success) {
        this.category = res.data;
      }
    })
  }

  LoadSearch(value: string) {
    if (value.trim() == '') {
      this.productsSearch = []
      return;
    }
    let form = new FormData();
    form.append("search", value);
    this.productsServices.searchProducts(form).subscribe((res) => {
      if (res.success) {
        this.productsSearch = res.data
      }
    })
  }

  HandleSearch() {
    if (this.productsSearch.length == 0) {
      this.ResetHeader();
      return;
    }
    this.router.navigate(['/shop'], { queryParams: { name: this.name } })
    this.ResetHeader();
  }
  ResetHeader() {
    this.productsSearch = []
    this.inputControl.setValue('')
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 400) {
      this.ResetHeader();
    }
  }
  LoadUser() {
    let token = this.auth.getCookie('TokenUser');
    this.isGroupBtn = token ? true : false;
    if (!token) {
      return;
    }
    let user: IUserToken = this.auth.decodeToken(token);
    this.userSevices.GetNameUser(Number(user.Id)).subscribe((res) => {
      this.fullName = res.data;
    });
  }

  LoadCart() {
    this.cartRepository.getDataByToken().subscribe((res) => {
      this.total = this.cartRepository.calculationTotal(res.data);
    });
  }
}
